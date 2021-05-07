export interface MathMLNowOptions {
    /**
     * The format of the math input
     */
    formatName: "TeX" | "inline-TeX" | "AsciiMath" | "MathML";
    /**
     * Use to set the effective font-size (in pixels) of the maths expression (defaults to 18)
     */
    fontSize?: number;
    /**
     * Use to set the color of the rendered equation (defaults to black). Accepts #rgb, #rrggbb or HTML color names
     */
    fontColor?: string;
    /**
     * The amount of blank space that will be left at the top and bottom of the equation to account for
     * differences between MathML and SVG - defaults to 0%
     */
    verticalMarginPercent?: number;
    /**
     * The amount of blank space that will be left at the left and right of the equation to account for
     * differences between MathML and SVG - defaults to 0%
     */
    horizontalMarginPercent?: number;
}

import * as mjAPI from "mathjax-node-sre";
import stream = require("stream");
import File = require("vinyl");

mjAPI.config({
    MathJax: {
        // traditional MathJax configuration
        menuSettings: {
            texHints: false,
            semantics: true
        }
    }
});

/**
 * Replace unusual unicode characters with their HTML entities
 * @param rawStr
 */
function replaceWithHTMLEntities(rawStr: string): string {
    return rawStr.replace(/[\u00A0-\u9999]/gim, function (i) {
        return `&#${i.charCodeAt(0)};`;
    });
}

/**
 * Generate a promise that resolves to a string of HTML that will display the inputted
 * maths equation in a way understood by all browsers
 * @param mathString The string representation of the maths equation you wish to display
 * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
 * @param id The ID number to use (should be incremented if called multiple times on the same page for unique ids)
 */
export function MathMLNow(mathString: string, options: MathMLNowOptions, id?: number) : Promise<string> {
    //Default font size is 18
    if (!options.fontSize) options.fontSize = 18;
    //Default vertical whitespace margin is 0%
    if (!options.verticalMarginPercent) options.verticalMarginPercent = 0;
    //Default horizontal whitespace margin is 0%
    if (!options.horizontalMarginPercent) options.horizontalMarginPercent = 0;
    //Default id is 1
    id = id || 1;

    return mjAPI.typeset({
        math: mathString,
        format: options.formatName,
        mmlNode: true,
        svgNode: true,
        speakText: true
    }).then(data => {
        const mml = data.mmlNode as DocumentFragment;
        const svg = data.svgNode as SVGSVGElement;
        //MathJax likes to make its content a relative size - but this isn't valid HTML, and breaks SVG2PNG
        //So we convert back to flat pixels
        const height = Math.ceil(Number.parseFloat(data.height) * 11 *
            options.fontSize / 18);
        const verticalMargin = Math.round(height * (options.verticalMarginPercent / 100));
        const heightWithMargin = height + verticalMargin * 2;
        const width = Math.ceil(Number.parseFloat(data.width) * 10.5 *
            options.fontSize / 18);
        const horizontalMargin = Math.round(width * (options.horizontalMarginPercent / 100));
        const widthWithMargin = width + horizontalMargin * 2;
        svg.setAttribute("height", height.toString());
        svg.setAttribute("width", width.toString());
        svg.removeAttribute("style");
        //Color the SVG
        if (options.fontColor) svg.setAttribute("color", options.fontColor);
        //Center the SVG
        if (!!horizontalMargin) svg.setAttribute("x", horizontalMargin.toString());
        if (!!verticalMargin) svg.setAttribute("y", verticalMargin.toString());
        //Set the ID for the SVG label
        const titleId = `MathJax-SVG-${id}-Title`;
        svg.setAttribute("aria-labelledby", titleId);
        svg.querySelector("title").id = titleId;

        //Scaling and coloring the MathML requires a <mstyle> element
        const mstyle = mml.ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", "mstyle");
        mstyle.setAttribute("mathsize", (Math.floor(options.fontSize)).toString() + "pt");
        if (options.fontColor) mstyle.setAttribute("mathcolor", options.fontColor);
        //Move the math nodes into the style node
        const mathChildNodes = Array.from(mml.childNodes);
        mathChildNodes.forEach((value) => {
            mstyle.appendChild(value);
        });
        mml.appendChild(mstyle);

        //create our <svg>, <switch> and <foreignObject> elements
        const parentSvg = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
        const switchElem = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "switch");
        const foreignObject = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg",
            "foreignObject");
        //If MathML is supported, we'll show the MathML - otherwise, we'll show the SVG backup
        //We use <switch> and requiredExtensions to do this
        foreignObject.setAttribute("requiredExtensions", "http://www.w3.org/1998/Math/MathML");
        foreignObject.setAttribute("height", heightWithMargin.toString());
        foreignObject.setAttribute("width", widthWithMargin.toString());
        foreignObject.appendChild(mml);
        switchElem.appendChild(foreignObject);
        switchElem.appendChild(svg);
        parentSvg.appendChild(switchElem);
        parentSvg.setAttribute("height", heightWithMargin.toString());
        parentSvg.setAttribute("width", widthWithMargin.toString());

        parentSvg.setAttribute("role", "presentation");

        return replaceWithHTMLEntities(parentSvg.outerHTML);
    });
}

/**
 * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
 * replacing instances of $$[Math string]$$ with the corresponding MathMLNow
 */
export class MathMlReplacer extends stream.Transform {
    private options: MathMLNowOptions;
    private state: number = 1;
    /**
     * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
     * replacing instances of $$[Math string]$$ with the corresponding MathML
     * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
     */
    constructor(options: MathMLNowOptions) {
        super({ objectMode: true });
        this.options = options || { formatName: "TeX" };
        this.options.formatName = options.formatName || "TeX";
    }

    /**
     * Like the normal JavaScript string replacer, but with an async callback function
     * Solution taken from https://stackoverflow.com/a/33631886/7077589
     * @param str The stream to replace
     * @param re The regex to do matches with
     * @param callback The async function to apply to the regex matches
     */
    private replaceAsync(str: string, re: RegExp | string,
        callback: (substring: string, ...args: any[]) => Promise<string>): Promise<string> {
        // http://es5.github.io/#x15.5.4.11
        str = String(str);
        const parts = [] as (Promise<string> | string)[];
        let i = 0;
        if (re instanceof RegExp) {
            //Regex search function - could have many matches
            if (re.global)
                re.lastIndex = i;
            let m: RegExpExecArray;
            while (m = re.exec(str)) {
                var args = m.concat([m.index.toString(), m.input]);
                parts.push(str.slice(i, m.index), callback.apply(null, args));
                i = re.lastIndex;
                if (!re.global)
                    break; // for non-global regexes only take the first match
                if (m[0].length == 0)
                    re.lastIndex++;
            }
        } else {
            //This is a string search function - it only has one match
            re = String(re);
            i = str.indexOf(re);
            parts.push(str.slice(0, i), callback.apply(null, [re, i, str]));
            i += re.length;
        }
        parts.push(str.slice(i));
        return Promise.all(parts).then(function (strings) {
            return strings.join("");
        });
    }

    /**
     * Apply MathMLNow to a vinyl file
     * @param file The file to assign our result to
     * @param data The string data we read from the file
     * @param enc The file encoding the file was initially in
     * @param callback The function to call when we are done
     */
    private rewriteFile(file: File, data: string, enc: BufferEncoding, callback: (err?: any, val?: File) => void): void {
        //First, replace the ones with all four properties, and then down from there
        this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\|\|(\d+)\|\|(\w+)\$\$/g,
            (match, math: string, fontSize: string, vMargin: string, hMargin: string, fontColor: string) => {
                const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                indiviualOptions.fontSize = Number(fontSize);
                indiviualOptions.verticalMarginPercent = Number(vMargin);
                indiviualOptions.horizontalMarginPercent = Number(hMargin);
                indiviualOptions.fontColor = fontColor;
                return MathMLNow(math, indiviualOptions, this.state++);
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\|\|(\d+)\$\$/g,
                (match, math: string, fontSize: string, vMargin: string, hMargin: string) => {
                    const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                    indiviualOptions.fontSize = Number(fontSize);
                    indiviualOptions.verticalMarginPercent = Number(vMargin);
                    indiviualOptions.horizontalMarginPercent = Number(hMargin);
                    return MathMLNow(math, indiviualOptions, this.state++);
            });
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\$\$/g,
                (match, math: string, fontSize: string, vMargin: string) => {
                    const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                    indiviualOptions.fontSize = Number(fontSize);
                    indiviualOptions.verticalMarginPercent = Number(vMargin);
                    return MathMLNow(math, indiviualOptions, this.state++);
            });
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\$\$/g,
                (match, math: string, fontSize: string) => {
                    const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                    indiviualOptions.fontSize = Number(fontSize);
                    return MathMLNow(math, indiviualOptions, this.state++);
            });
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\$\$/g, (match, math: string) => {
                return MathMLNow(math, this.options, this.state++);
            });
        }).then(processedTemp => {
            //All done! Write to the file now!
            file.contents = Buffer.from(processedTemp, enc);
            callback(null, file);
        }).catch(reason => {
            //If there was a fail, pass the reason why up the chain
            callback(reason);
        });
    }

    /**
     * Reads a stream into memory so that we can run Regex on it
     * @param stream The stream to read from
     * @param enc The encoding of the stream
     * @param callback A callback function to run when we are done
     */
    private streamToString(stream: NodeJS.ReadableStream, enc: string, callback: (data: string) => void) {
        const chunks = [] as string[];
        stream.on('data', (chunk: Buffer | string | any) => {
            chunks.push(chunk.toString(enc));
        });
        stream.on('end', () => {
            callback(chunks.join(''));
        });
    }
    /**
     * @inheritdoc
     */
    public _transform(file: File, enc: BufferEncoding, callback: (err?: any, val?: File) => void): void {
        if (file.isNull()) {
            callback(null, file);
        }
        else if (file.isBuffer()) {
            const data = file.contents.toString(enc);
            this.rewriteFile(file, data, enc, callback);
        }
        else if (file.isStream()) {
            this.streamToString(file.contents, enc, fileContents => {
                this.rewriteFile(file, fileContents, enc, callback);
            });
        }
    }
}
export interface MathMLNowOptions {
    /**
     * The format of the math input
     */
    formatName: "TeX" | "inline-TeX" | "AsciiMath" | "MathML";
    /**
     * If you want to support browsers that can't render MathML or SVG (generally IE8 and below)
     * then include a relative file path to your image folder here (must end in a '/'!). PNG fallbacks
     * for the SVG files will be saved there.
     */
    imageFolder?: string;
    /**
     * The filename to save any image files under (defaults to a hash of the math input)
     */
    fileName?: string;
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

interface IConvertSvgToPng {
    convert(input: string | Buffer, options: any): Promise<Buffer>;
}

import * as mjAPI from "mathjax-node-sre";
import * as convertSvgToPng from "convert-svg-to-png";
const hash = require("string-hash");
import * as fs from "fs";
import * as path from "path";
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
 */
export function MathMLNow(mathString: string, options: MathMLNowOptions) : Promise<string> {
    //Default font size is 18
    if (!options.fontSize) options.fontSize = 18;
    //Default vertical whitespace margin is 0%
    if (!options.verticalMarginPercent) options.verticalMarginPercent = 0;
    //Default horizontal whitespace margin is 0%
    if (!options.horizontalMarginPercent) options.horizontalMarginPercent = 0;

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
        const widthWithMargin = width + horizontalMargin * 2;;
        svg.setAttribute("height", height.toString());
        svg.setAttribute("width", width.toString());
        svg.removeAttribute("style");
        //Color the SVG
        if (options.fontColor) svg.setAttribute("color", options.fontColor);
        //Center the SVG
        if (!!horizontalMargin) svg.setAttribute("x", horizontalMargin.toString());
        if (!!verticalMargin) svg.setAttribute("y", verticalMargin.toString());

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

        parentSvg.setAttribute("aria-label", data.speakText);

        if (options.imageFolder) {
            //Same as above, plus:
            //For the browsers that don't support SVG, we'll render a PNG instead
            const pngFilePath = options.imageFolder + (options.fileName || hash(mathString).toString()) + ".png";

            let basePath = __dirname;

            if (basePath.includes("node_modules")) {
                //If we're being called as a node_module, our actuall base path is two folders up
                basePath = path.join(basePath, "../../");
            }

            const svgBuffer = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>` +
                svg.outerHTML, "utf8");
            //For the browsers that don't support SVG, we'll render a PNG instead
            return (convertSvgToPng as IConvertSvgToPng).convert(svgBuffer, {
                //Make the image three times as large to help with quality
                scale: 3
            }).then(png => {
                return new Promise<string>((resolve, reject) => {
                    fs.writeFile(path.join(basePath, pngFilePath), png, (error) => {
                        if (error) reject(error);

                        //Hiding the SVG text in unsuporting browsers requires an <a> tag wrapped around it's contents
                        const svga = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "a");
                        svga.classList.add("mmln-f");
                        //Move the math nodes into the style node
                        const parentSvgChildNodes = Array.from(parentSvg.childNodes);
                        parentSvgChildNodes.forEach((value) => {
                            svga.appendChild(value);
                        });
                        parentSvg.appendChild(svga);

                        const img = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "image");
                        img.setAttribute("src", pngFilePath);
                        img.setAttribute("height", svg.getAttribute("height"));
                        img.setAttribute("width", svg.getAttribute("width"));
                        img.setAttribute("alt", data.speakText);
                        img.setAttribute("xlink:href", "");
                        img.classList.add("mml-i");
                        parentSvg.appendChild(img);

                        resolve(replaceWithHTMLEntities(parentSvg.outerHTML));
                    });
                });
            });
        }

        return replaceWithHTMLEntities(parentSvg.outerHTML);
    });
}

/**
 * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
 * replacing instances of $$[Math string]$$ with the corresponding MathMLNow
 */
export class MathMlReplacer extends stream.Transform {
    private options: MathMLNowOptions;
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
            let m;
            while (m = re.exec(str)) {
                var args = m.concat([m.index, m.input]);
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
    private rewriteFile(file: File, data: string, enc: string, callback: (err?: any, val?: File) => void): void {
        //First, replace the ones with all four properties, and then down from there
        this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\|\|(\d+)\|\|(\w+)\$\$/g,
            (match, math: string, fontSize: string, vMargin: string, hMargin: string, fontColor: string) => {
                const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                indiviualOptions.fontSize = Number(fontSize);
                indiviualOptions.verticalMarginPercent = Number(vMargin);
                indiviualOptions.horizontalMarginPercent = Number(hMargin);
                indiviualOptions.fontColor = fontColor;
                return MathMLNow(math, indiviualOptions);
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\|\|(\d+)\$\$/g,
                (match, math: string, fontSize: string, vMargin: string, hMargin: string) => {
                    const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                    indiviualOptions.fontSize = Number(fontSize);
                    indiviualOptions.verticalMarginPercent = Number(vMargin);
                    indiviualOptions.horizontalMarginPercent = Number(hMargin);
                    return MathMLNow(math, indiviualOptions);
            });
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\$\$/g,
                (match, math: string, fontSize: string, vMargin: string) => {
                    const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                    indiviualOptions.fontSize = Number(fontSize);
                    indiviualOptions.verticalMarginPercent = Number(vMargin);
                    return MathMLNow(math, indiviualOptions);
            });
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\$\$/g,
                (match, math: string, fontSize: string) => {
                    const indiviualOptions = Object.create(this.options) as MathMLNowOptions;
                    indiviualOptions.fontSize = Number(fontSize);
                    return MathMLNow(math, indiviualOptions);
            });
        }).then(data => {
            return this.replaceAsync(data, /\$\$(.+?)\$\$/g, (match, math: string) => {
                return MathMLNow(math, this.options);
            });
        }).then(processedTemp => {
            //All done! Write to the file now!
            file.contents = new Buffer(processedTemp, enc);
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

    public _transform(file: File, enc: string, callback: (err?: any, val?: File) => void): void {
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
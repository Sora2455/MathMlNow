export interface MathMLNowOptions {
    /**
     * The format of the math input
     */
    formatName: "TeX" | "inline-TeX" | "AsciiMath" | "MathML";
    /**
     * Set to true to support browsers that don't support SVG (IE8 and below)
     */
    supportOutdatedBrowsers?: boolean;
    /**
     * If you want to store the math as external resources
     * (for example, becuase the same formula is used more than once)
     * then include a relative file path to your image folder here (must end in a '/'!)
     */
    imageFolder?: string;
    /**
     * The filename to save any external math files under (defaults to a hash of the math input)
     */
    fileName?: string;
    /**
     * Set to true to strip whitespace from the generated HTML/SVG/MathML
     */
    minify?: boolean;
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
import { convert } from "convert-svg-to-png";
const hash = require("string-hash");
import * as fs from "fs";
import * as xmlserializer from "xmlserializer";

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
 * Convert a node into a minified string of HTML/SVG/MathML
 * @param element The Element we are stringifiying
 */
function getStringRepresentation(element: Element): string {
    let result = "";
    result += xmlserializer.serializeToString(element);
    //The serializer thinks that <title> is an xhtml element, not an svg one - not true
    return result.replace(` xmlns="http://www.w3.org/1999/xhtml"`, "");
}

/**
 * Generate a promise that resolves to a string of HTML that will display the inputted
 * maths equation in a way understood by all browsers
 * @param mathString The string representation of the maths equation you wish to display
 * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
 */
export async function MathMLNow(mathString: string, options: MathMLNowOptions) : Promise<string> {
    //Default font size is 18
    if (!options.fontSize) options.fontSize = 18;
    //Default vertical whitespace margin is 0%
    if (!options.verticalMarginPercent) options.verticalMarginPercent = 0;
    //Default horizontal whitespace margin is 0%
    if (!options.horizontalMarginPercent) options.horizontalMarginPercent = 0;

    if (options.supportOutdatedBrowsers && !options.imageFolder) {
        //The same browsers that don't support SVG also don't support data uris
        throw new Error("In order to support outdated browsers, the PNGs must be saved externally" +
            " - please provide a path to your website's image folder.");
    }

    const data = await mjAPI.typeset({
        math: mathString,
        format: options.formatName,
        mmlNode: true,
        svgNode: true,
        speakText: true
    });

    if (!data.errors) {
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

        let resultString: string;

        parentSvg.setAttribute("aria-label", data.speakText);

        if (options.supportOutdatedBrowsers) {
            //Same as above, plus:
            //For the browsers that don't support SVG, we'll render a PNG instead
            const pngFilePath = options.imageFolder + (options.fileName || hash(mathString).toString()) + ".png";

            const svgBuffer = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>` +
                getStringRepresentation(svg), "utf8");
            //For the browsers that don't support SVG, we'll render a PNG instead
            const png = await convert(svgBuffer, {
                //Make the image three times as large to help with quality
                scale: 3
            });
            await fs.writeFile(__dirname + pngFilePath, png, (error) => {
                if (error) throw new Error(error.message + " " + error.stack);
            });

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
            parentSvg.appendChild(img);
        }

        resultString = getStringRepresentation(parentSvg);

        return resultString;
    } else {
        const errors = data.errors as string[];
        throw new Error(errors.join("\n"));
    }
}
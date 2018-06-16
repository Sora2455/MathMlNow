/// <reference types="node" />
/// <reference types="vinyl" />
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
import stream = require("stream");
import File = require("vinyl");
/**
 * Generate a promise that resolves to a string of HTML that will display the inputted
 * maths equation in a way understood by all browsers
 * @param mathString The string representation of the maths equation you wish to display
 * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
 */
export declare function MathMLNow(mathString: string, options: MathMLNowOptions): Promise<string>;
/**
 * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
 * replacing instances of $$[Math string]$$ with the corresponding MathMLNow
 */
export declare class MathMlReplacer extends stream.Transform {
    private options;
    /**
     * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
     * replacing instances of $$[Math string]$$ with the corresponding MathML
     * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
     */
    constructor(options: MathMLNowOptions);
    /**
     * Like the normal JavaScript string replacer, but with an async callback function
     * Solution taken from https://stackoverflow.com/a/33631886/7077589
     * @param str The stream to replace
     * @param re The regex to do matches with
     * @param callback The async function to apply to the regex matches
     */
    private replaceAsync(str, re, callback);
    /**
     * Apply MathMLNow to a vinyl file
     * @param file The file to assign our result to
     * @param data The string data we read from the file
     * @param enc The file encoding the file was initially in
     * @param callback The function to call when we are done
     */
    private rewriteFile(file, data, enc, callback);
    /**
     * Reads a stream into memory so that we can run Regex on it
     * @param stream The stream to read from
     * @param enc The encoding of the stream
     * @param callback A callback function to run when we are done
     */
    private streamToString(stream, enc, callback);
    _transform(file: File, enc: string, callback: (err?: any, val?: File) => void): void;
}

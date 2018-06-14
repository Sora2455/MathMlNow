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
/**
 * Generate a promise that resolves to a string of HTML that will display the inputted
 * maths equation in a way understood by all browsers
 * @param mathString The string representation of the maths equation you wish to display
 * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
 */
export declare function MathMLNow(mathString: string, options: MathMLNowOptions): Promise<string>;

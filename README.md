# MathMLNow - MathML with scriptless fallback

"Mathematical Markup Language (MathML) is a dialect of XML for describing mathematical notation and capturing both its structure and content." - [MDN](https://developer.mozilla.org/en-US/docs/Web/MathML)

In browsers that support it, MathML allows for the display of maths equations in a simple way that never pixilates, can be copied and pasted, and can be read by screen readers.

But because most browsers do _not_ support MathML, fallback content is necessary. Traditionally, this has been done with the JavaScript library [MathJax](https://www.mathjax.org/), but MathJax suffers from the same problem any JavaScript library has - it is a large download that slows down the users browsing; and doesn't work when JavaScript is turned off (or more likely, broken by another script on the page).

MathMLNow is a Node package that produces a series of HTML tags that show MathML if available, gracefully degrading to an SVG image, and then to a PNG image if even SVG is not supported.

To see an example of this technique in action, visit [this example page](https://cdn.rawgit.com/Sora2455/MathMlNow/d814dde5/example.html).

## Getting started

MathMLNow provides a function in the file `./app.js`.

The file provided is called `MathMLNow`. To generate the MathMLNow used in the example file, the following commands were used:

```JavaScript
//Remember to escape '\' characters!
MathMLNow("x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}", {
    formatName: "TeX",
    minify: false,
    supportOutdatedBrowsers: true,
    imageFolder: "/img/",
    fontSize: 18
}).then((result) => console.log("Quadratic formula:\n" + result));
MathMLNow("e^{i\\pi}+1=0", {
    formatName: "TeX",
    minify: false,
    supportOutdatedBrowsers: true,
    imageFolder: "/img/",
    fontSize: 30
}).then((result) => console.log("Euler's identity:\n" + result));
MathMLNow("\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)", {
    formatName: "TeX",
    minify: false,
    supportOutdatedBrowsers: true,
    imageFolder: "/img/",
    fontSize: 16,
    verticalMarginPercent: 20
}).then((result) => console.log("Integral of the secant function:\n" + result));
```

## Documentation

`MathMLNow` takes two paramaters - a string representing the maths equation to render (in the same formats [MathJax-node](https://github.com/mathjax/MathJax-node) accepts, as that is what is used internally), and a `MathMLNowOptions` object.

```TypeScript
interface MathMLNowOptions {
    /**
     * The format of the math input
     */
    formatName: "TeX" | "inline-TeX" | "AsciiMath" | "MathML",
    /**
     * Set to true to support browsers that don't support SVG (IE8 and below)
     */
    supportOutdatedBrowsers?: boolean,
    /**
     * If you want to store the math as external resources
     * (for example, becuase the same formula is used more than once)
     * then include a relative file path to your image folder here (must end in a '/'!)
     */
    imageFolder?: string,
    /**
     * The filename to save any external math files under (defaults to a hash of the math input)
     */
    fileName?: string,
    /**
     * Set to true to strip whitespace from the generated HTML/SVG/MathML
     */
    minify?: boolean,
    /**
     * Use to set the effective font-size (in pixels) of the maths expression (defaults to 18)
     */
    fontSize?: number,
    /**
     * Use to set the color of the rendered equation (defaults to black). Accepts #rgb, #rrggbb or HTML color names
     */
    fontColor?: string,
    /**
     * The amount of blank space that will be left at the top and bottom of the equation to account for
     * differences between MathML and SVG - defaults to 0%
     */
    verticalMarginPercent?: number,
    /**
     * The amount of blank space that will be left at the left and right of the equation to account for
     * differences between MathML and SVG - defaults to 0%
     */
    horizontalMarginPercent?: number,
    /**
     * The class placed on the SVG element so it can be hidden if not supported - defaults to 'SVG'
     */
    svgClass?: string,
    /**
     * The class place on the IMG element so it can be shown if SVG is not supported - defaults to 'svgFallback'
     */
    svgNotSupportedClass?: string
}
```
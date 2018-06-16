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
    imageFolder: "/img/",
    fontSize: 18
}).then((result) => console.log("Quadratic formula:\n" + result));
MathMLNow("e^{i\\pi}+1=0", {
    formatName: "TeX",
    minify: false,
    imageFolder: "/img/",
    fontSize: 30
}).then((result) => console.log("Euler's identity:\n" + result));
MathMLNow("\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)", {
    formatName: "TeX",
    minify: false,
    imageFolder: "/img/",
    fontSize: 16,
    verticalMarginPercent: 20
}).then((result) => console.log("Integral of the secant function:\n" + result));
```

If you wish to support browsers that do not support SVG graphics (about [2.5% of the world](https://caniuse.com/#feat=svg-html5) at the time of writing), you need to add this to your website's CSS:

```CSS
.mmln-f {
	display: block;
	position: absolute;
	left: -100%;
	height: 0;
	width: 0;
	overflow: hidden;
}
```

If you wish to replace inline math instances in a large file (say, a HTML page), then you can pipe it as a [vinyl](https://github.com/gulpjs/vinyl) stream:

```JavaScript
	var mathMlNowReplacer = new MathMlReplacer(options);

	gulp.src(['src/**/*.html'])
	  .pipe(mathMlNowReplacer)
	  .pipe(gulp.dest('dist'));
```

(Thanks to [CSS-Tricks](https://css-tricks.com/a-complete-guide-to-svg-fallbacks/) for sharing this nugget of wisdom.)

## Documentation

`MathMLNow` takes two paramaters - a string representing the maths equation to render (in the same formats [MathJax-node](https://github.com/mathjax/MathJax-node) accepts, as that is what is used internally), and a `MathMLNowOptions` object.

```TypeScript
interface MathMLNowOptions {
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
```
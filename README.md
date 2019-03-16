# MathMLNow - MathML with scriptless fallback

"Mathematical Markup Language (MathML) is a dialect of XML for describing mathematical notation and capturing both its structure and content." - [MDN](https://developer.mozilla.org/en-US/docs/Web/MathML)

In browsers that support it, MathML allows for the display of maths equations in a simple way that never pixilates, can be copied and pasted, and can be read by screen readers.

But because most browsers do _not_ support MathML, fallback content is necessary. Traditionally, this has been done with the JavaScript library [MathJax](https://www.mathjax.org/), but MathJax suffers from the same problem any JavaScript library has - it is a large download that slows down the users browsing; and doesn't work when JavaScript is turned off (or more likely, broken by another script on the page).

MathMLNow is a Node package that produces a series of HTML tags that show MathML if available, gracefully degrading to an SVG image, and then to a PNG image if even SVG is not supported.

To see an example of this technique in action, visit [this example page](https://sora2455.github.io/MathMlNow/).

## Getting started

MathMLNow provides a function in the file `./app.js`.

The file provided is called `MathMLNow`. To generate the MathMLNow used in the example file, the following commands were used:

```JavaScript
//Remember to escape '\' characters!
MathMLNow("x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}", {
    formatName: "TeX",
    imageFolder: "/img/",
    fontSize: 18
}).then((result) => console.log("Quadratic formula:\n" + result));
MathMLNow("e^{i\\pi}+1=0", {
    formatName: "TeX",
    imageFolder: "/img/",
    fontSize: 30
}).then((result) => console.log("Euler's identity:\n" + result));
MathMLNow("\\int_0^{\\pi/6}\\sec\\left(y\\right)\\operatorname dy=\\ln\\left(\\sqrt3i^{64}\\right)", {
    formatName: "TeX",
    imageFolder: "/img/",
    fontSize: 16,
    verticalMarginPercent: 20
}).then((result) => console.log("Integral of the secant function:\n" + result));
```

If you wish to support browsers that do not support SVG graphics (about [2.5% of the world](https://caniuse.com/#feat=svg-html5) at the time of writing), you need to pass the location to your website's image folder to the imageFolder config option.
In addition, add the following to your website's CSS:

```CSS
.mmln-f {
	display: block;
	position: absolute;
	left: -100%;
	height: 0;
	width: 0;
	overflow: hidden;
}
svg image.mml-i {
	display: none;
}
```

(Thanks to [CSS-Tricks](https://css-tricks.com/a-complete-guide-to-svg-fallbacks/) for sharing this nugget of wisdom.)

If you wish to replace inline math instances in a large file (say, a HTML page), then you can pipe it as a [vinyl](https://github.com/gulpjs/vinyl) stream:

```JavaScript
const gulp = require('gulp');
const rename = require('gulp-rename');
const mmlN = require("math-ml-now");

gulp.task('mathReplace', () => {
	const replacer = new mmlN.MathMlReplacer({
		formatName: "TeX",
		imageFolder: "/img/",
	});

	return gulp.src("**/*.pre.html")
		.pipe(replacer)
		.pipe(rename(function (opt) {
			opt.basename = opt.basename.replace('.pre', '');
			return opt;
		}))
		.pipe(gulp.dest(function (file) {
			return file.base;
		}));
});
```

This will replace any instance of Math inbetween two "$$" strings, with font-size, vertical margin percent, horizontal margin percent, and font-color all settable in optional paramaters (in that order) provided after the math string with "||" seperators.

For example, if you wanted the Euler's identity result from up above, you would place

`$$e^{i\pi}+1=0||30$$`

(math string = "e^{i\pi}+1=0", font-size = 30) wherever you wanted that math to appear.

The Integral of the secant function from up above would be expressed as

`$$\int_0^{\pi/6}\sec\left(y\right)\operatorname dy=\ln\left(\sqrt3i^{64}\right)||16||20$$`

(math string = "\int_0^{\pi/6}\sec\left(y\right)\operatorname dy=\ln\left(\sqrt3i^{64}\right)", font-size = 16, vertical margin percent = 20).

## Using with [MathJax](https://www.mathjax.org/)

If you want to use this as a fallback and MathJax when possible, add this script to your page after where you included the MathJax script:

```JavaScript
MathJax.Hub.Register.StartupHook("End Extensions", function(){
	var mathElements = document.querySelectorAll("foreignObject[requiredExtensions='http://www.w3.org/1998/Math/MathML'] math");
	var getParentSvg = Element.prototype.closest ?
		function(el) {return el.closest("svg")} :
		function(el) {return el.parentNode.parentNode.parentNode.parentNode};
	for (var i = 0; i < mathElements.length; i++) {
		var mathElement = mathElements[i];
		var parentSvg = getParentSvg(mathElement);
		//Extract the math from the SVG and remove the SVG
		parentSvg.parentNode.replaceChild(mathElement, parentSvg);
	}
});
```

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
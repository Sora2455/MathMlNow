# MathMLNow - MathML with scriptless fallback

"Mathematical Markup Language (MathML) is a dialect of XML for describing mathematical notation and capturing both its structure and content." - [MDN](https://developer.mozilla.org/en-US/docs/Web/MathML)

In browsers that support it, MathML allows for the display of maths equations in a simple way that never pixilates, can be copied and pasted, and can be read by screen readers.

But because most browsers do _not_ support MathML, fallback content is necessary. Traditionally, this has been done with the JavaScript library [MathJax](https://www.mathjax.org/), but MathJax suffers from the same problem any JavaScript library has - it is a large download that slows down the users browsing; and doesn't work when JavaScript is turned off (or more likely, broken by another script on the page).

MathMLNow is a server-side rendering technique that produces a series of HTML tags that show MathML if available, gracefully degrading to an SVG image, and then to a PNG image if even SVG is not supported.

To see an example of this technique in action, visit [this example page](https://cdn.rawgit.com).

* * *


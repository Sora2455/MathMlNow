"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MathMlReplacer = exports.MathMLNow = void 0;
var mjAPI = require("mathjax-node-sre");
var stream = require("stream");
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
function replaceWithHTMLEntities(rawStr) {
    return rawStr.replace(/[\u00A0-\u9999]/gim, function (i) {
        return "&#" + i.charCodeAt(0) + ";";
    });
}
/**
 * Generate a promise that resolves to a string of HTML that will display the inputted
 * maths equation in a way understood by all browsers
 * @param mathString The string representation of the maths equation you wish to display
 * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
 * @param id The ID number to use (should be incremented if called multiple times on the same page for unique ids)
 */
function MathMLNow(mathString, options, id) {
    //Default font size is 18
    if (!options.fontSize)
        options.fontSize = 18;
    //Default vertical whitespace margin is 0%
    if (!options.verticalMarginPercent)
        options.verticalMarginPercent = 0;
    //Default horizontal whitespace margin is 0%
    if (!options.horizontalMarginPercent)
        options.horizontalMarginPercent = 0;
    //Default id is 1
    id = id || 1;
    return mjAPI.typeset({
        math: mathString,
        format: options.formatName,
        mmlNode: true,
        svgNode: true,
        speakText: true
    }).then(function (data) {
        var mml = data.mmlNode;
        var svg = data.svgNode;
        //MathJax likes to make its content a relative size - but this isn't valid HTML, and breaks SVG2PNG
        //So we convert back to flat pixels
        var height = Math.ceil(Number.parseFloat(data.height) * 11 *
            options.fontSize / 18);
        var verticalMargin = Math.round(height * (options.verticalMarginPercent / 100));
        var heightWithMargin = height + verticalMargin * 2;
        var width = Math.ceil(Number.parseFloat(data.width) * 10.5 *
            options.fontSize / 18);
        var horizontalMargin = Math.round(width * (options.horizontalMarginPercent / 100));
        var widthWithMargin = width + horizontalMargin * 2;
        svg.setAttribute("height", height.toString());
        svg.setAttribute("width", width.toString());
        svg.removeAttribute("style");
        //Color the SVG
        if (options.fontColor)
            svg.setAttribute("color", options.fontColor);
        //Center the SVG
        if (!!horizontalMargin)
            svg.setAttribute("x", horizontalMargin.toString());
        if (!!verticalMargin)
            svg.setAttribute("y", verticalMargin.toString());
        //Set the ID for the SVG label
        var titleId = "MathJax-SVG-" + id + "-Title";
        svg.setAttribute("aria-labelledby", titleId);
        svg.querySelector("title").id = titleId;
        //Scaling and coloring the MathML requires a <mstyle> element
        var mstyle = mml.ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", "mstyle");
        mstyle.setAttribute("mathsize", (Math.floor(options.fontSize)).toString() + "pt");
        if (options.fontColor)
            mstyle.setAttribute("mathcolor", options.fontColor);
        //Move the math nodes into the style node
        var mathChildNodes = Array.from(mml.childNodes);
        mathChildNodes.forEach(function (value) {
            mstyle.appendChild(value);
        });
        mml.appendChild(mstyle);
        //create our <svg>, <switch> and <foreignObject> elements
        var parentSvg = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
        var switchElem = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "switch");
        var foreignObject = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
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
exports.MathMLNow = MathMLNow;
/**
 * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
 * replacing instances of $$[Math string]$$ with the corresponding MathMLNow
 */
var MathMlReplacer = /** @class */ (function (_super) {
    __extends(MathMlReplacer, _super);
    /**
     * A Gulp-style replacer function that will rewrite large chunks of text (like a HTML page),
     * replacing instances of $$[Math string]$$ with the corresponding MathML
     * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
     */
    function MathMlReplacer(options) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.state = 1;
        _this.options = options || { formatName: "TeX" };
        _this.options.formatName = options.formatName || "TeX";
        return _this;
    }
    /**
     * Like the normal JavaScript string replacer, but with an async callback function
     * Solution taken from https://stackoverflow.com/a/33631886/7077589
     * @param str The stream to replace
     * @param re The regex to do matches with
     * @param callback The async function to apply to the regex matches
     */
    MathMlReplacer.prototype.replaceAsync = function (str, re, callback) {
        // http://es5.github.io/#x15.5.4.11
        str = String(str);
        var parts = [];
        var i = 0;
        if (re instanceof RegExp) {
            //Regex search function - could have many matches
            if (re.global)
                re.lastIndex = i;
            var m = void 0;
            while (m = re.exec(str)) {
                var args = m.concat([m.index.toString(), m.input]);
                parts.push(str.slice(i, m.index), callback.apply(null, args));
                i = re.lastIndex;
                if (!re.global)
                    break; // for non-global regexes only take the first match
                if (m[0].length == 0)
                    re.lastIndex++;
            }
        }
        else {
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
    };
    /**
     * Apply MathMLNow to a vinyl file
     * @param file The file to assign our result to
     * @param data The string data we read from the file
     * @param enc The file encoding the file was initially in
     * @param callback The function to call when we are done
     */
    MathMlReplacer.prototype.rewriteFile = function (file, data, enc, callback) {
        var _this = this;
        //First, replace the ones with all four properties, and then down from there
        this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\|\|(\d+)\|\|(\w+)\$\$/g, function (match, math, fontSize, vMargin, hMargin, fontColor) {
            var indiviualOptions = Object.create(_this.options);
            indiviualOptions.fontSize = Number(fontSize);
            indiviualOptions.verticalMarginPercent = Number(vMargin);
            indiviualOptions.horizontalMarginPercent = Number(hMargin);
            indiviualOptions.fontColor = fontColor;
            return MathMLNow(math, indiviualOptions, _this.state++);
        }).then(function (data) {
            return _this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\|\|(\d+)\$\$/g, function (match, math, fontSize, vMargin, hMargin) {
                var indiviualOptions = Object.create(_this.options);
                indiviualOptions.fontSize = Number(fontSize);
                indiviualOptions.verticalMarginPercent = Number(vMargin);
                indiviualOptions.horizontalMarginPercent = Number(hMargin);
                return MathMLNow(math, indiviualOptions, _this.state++);
            });
        }).then(function (data) {
            return _this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\|\|(\d+)\$\$/g, function (match, math, fontSize, vMargin) {
                var indiviualOptions = Object.create(_this.options);
                indiviualOptions.fontSize = Number(fontSize);
                indiviualOptions.verticalMarginPercent = Number(vMargin);
                return MathMLNow(math, indiviualOptions, _this.state++);
            });
        }).then(function (data) {
            return _this.replaceAsync(data, /\$\$(.+?)\|\|(\d+)\$\$/g, function (match, math, fontSize) {
                var indiviualOptions = Object.create(_this.options);
                indiviualOptions.fontSize = Number(fontSize);
                return MathMLNow(math, indiviualOptions, _this.state++);
            });
        }).then(function (data) {
            return _this.replaceAsync(data, /\$\$(.+?)\$\$/g, function (match, math) {
                return MathMLNow(math, _this.options, _this.state++);
            });
        }).then(function (processedTemp) {
            //All done! Write to the file now!
            file.contents = Buffer.from(processedTemp, enc);
            callback(null, file);
        })["catch"](function (reason) {
            //If there was a fail, pass the reason why up the chain
            callback(reason);
        });
    };
    /**
     * Reads a stream into memory so that we can run Regex on it
     * @param stream The stream to read from
     * @param enc The encoding of the stream
     * @param callback A callback function to run when we are done
     */
    MathMlReplacer.prototype.streamToString = function (stream, enc, callback) {
        var chunks = [];
        stream.on('data', function (chunk) {
            chunks.push(chunk.toString(enc));
        });
        stream.on('end', function () {
            callback(chunks.join(''));
        });
    };
    /**
     * @inheritdoc
     */
    MathMlReplacer.prototype._transform = function (file, enc, callback) {
        var _this = this;
        if (file.isNull()) {
            callback(null, file);
        }
        else if (file.isBuffer()) {
            var data = file.contents.toString(enc);
            this.rewriteFile(file, data, enc, callback);
        }
        else if (file.isStream()) {
            this.streamToString(file.contents, enc, function (fileContents) {
                _this.rewriteFile(file, fileContents, enc, callback);
            });
        }
    };
    return MathMlReplacer;
}(stream.Transform));
exports.MathMlReplacer = MathMlReplacer;

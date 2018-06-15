"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mjAPI = require("mathjax-node-sre");
var convert_svg_to_png_1 = require("convert-svg-to-png");
var hash = require("string-hash");
var fs = require("fs");
var xmlserializer = require("xmlserializer");
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
 * Convert a node into a minified string of HTML/SVG/MathML
 * @param element The Element we are stringifiying
 */
function getStringRepresentation(element) {
    var result = "";
    result += xmlserializer.serializeToString(element);
    //The serializer thinks that <title> is an xhtml element, not an svg one - not true
    return result.replace(" xmlns=\"http://www.w3.org/1999/xhtml\"", "");
}
/**
 * Generate a promise that resolves to a string of HTML that will display the inputted
 * maths equation in a way understood by all browsers
 * @param mathString The string representation of the maths equation you wish to display
 * @param options The MathMLNowOptions object that will control the behaviour of the rendered equation
 */
function MathMLNow(mathString, options) {
    return __awaiter(this, void 0, void 0, function () {
        var data, mml, svg, height, verticalMargin, heightWithMargin, width, horizontalMargin, widthWithMargin, mstyle_1, mathChildNodes, parentSvg, switchElem, foreignObject, resultString, pngFilePath, svgBuffer, png, svga_1, parentSvgChildNodes, img, errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //Default font size is 18
                    if (!options.fontSize)
                        options.fontSize = 18;
                    //Default vertical whitespace margin is 0%
                    if (!options.verticalMarginPercent)
                        options.verticalMarginPercent = 0;
                    //Default horizontal whitespace margin is 0%
                    if (!options.horizontalMarginPercent)
                        options.horizontalMarginPercent = 0;
                    if (options.supportOutdatedBrowsers && !options.imageFolder) {
                        //The same browsers that don't support SVG also don't support data uris
                        throw new Error("In order to support outdated browsers, the PNGs must be saved externally" +
                            " - please provide a path to your website's image folder.");
                    }
                    return [4 /*yield*/, mjAPI.typeset({
                            math: mathString,
                            format: options.formatName,
                            mmlNode: true,
                            svgNode: true,
                            speakText: true
                        })];
                case 1:
                    data = _a.sent();
                    if (!!data.errors) return [3 /*break*/, 5];
                    mml = data.mmlNode;
                    svg = data.svgNode;
                    height = Math.ceil(Number.parseFloat(data.height) * 11 *
                        options.fontSize / 18);
                    verticalMargin = Math.round(height * (options.verticalMarginPercent / 100));
                    heightWithMargin = height + verticalMargin * 2;
                    width = Math.ceil(Number.parseFloat(data.width) * 10.5 *
                        options.fontSize / 18);
                    horizontalMargin = Math.round(width * (options.horizontalMarginPercent / 100));
                    widthWithMargin = width + horizontalMargin * 2;
                    ;
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
                    mstyle_1 = mml.ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", "mstyle");
                    mstyle_1.setAttribute("mathsize", (Math.floor(options.fontSize)).toString() + "pt");
                    if (options.fontColor)
                        mstyle_1.setAttribute("mathcolor", options.fontColor);
                    mathChildNodes = Array.from(mml.childNodes);
                    mathChildNodes.forEach(function (value) {
                        mstyle_1.appendChild(value);
                    });
                    mml.appendChild(mstyle_1);
                    parentSvg = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
                    switchElem = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "switch");
                    foreignObject = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
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
                    resultString = void 0;
                    parentSvg.setAttribute("aria-label", data.speakText);
                    if (!options.supportOutdatedBrowsers) return [3 /*break*/, 4];
                    pngFilePath = options.imageFolder + (options.fileName || hash(mathString).toString()) + ".png";
                    svgBuffer = Buffer.from("<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                        getStringRepresentation(svg), "utf8");
                    return [4 /*yield*/, convert_svg_to_png_1.convert(svgBuffer, {
                            //Make the image three times as large to help with quality
                            scale: 3
                        })];
                case 2:
                    png = _a.sent();
                    return [4 /*yield*/, fs.writeFile(__dirname + pngFilePath, png, function (error) {
                            if (error)
                                throw new Error(error.message + " " + error.stack);
                        })];
                case 3:
                    _a.sent();
                    svga_1 = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "a");
                    svga_1.classList.add("mmln-f");
                    parentSvgChildNodes = Array.from(parentSvg.childNodes);
                    parentSvgChildNodes.forEach(function (value) {
                        svga_1.appendChild(value);
                    });
                    parentSvg.appendChild(svga_1);
                    img = mml.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "image");
                    img.setAttribute("src", pngFilePath);
                    img.setAttribute("height", svg.getAttribute("height"));
                    img.setAttribute("width", svg.getAttribute("width"));
                    img.setAttribute("alt", data.speakText);
                    img.setAttribute("xlink:href", "");
                    parentSvg.appendChild(img);
                    _a.label = 4;
                case 4:
                    resultString = getStringRepresentation(parentSvg);
                    return [2 /*return*/, resultString];
                case 5:
                    errors = data.errors;
                    throw new Error(errors.join("\n"));
            }
        });
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
                var args = m.concat([m.index, m.input]);
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
        this.replaceAsync(data, /\$\$([^]+?)\$\$/gm, function (match, p1) {
            return MathMLNow(p1, _this.options);
        }).then(function (processedTemp) {
            file.contents = new Buffer(processedTemp, enc);
            callback(null, file);
        }).catch(function (reason) {
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
//# sourceMappingURL=app.js.map
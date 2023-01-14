(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.SmartAppBridge = factory());
})(this, function() {
  "use strict";var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  var PLATFORM = /* @__PURE__ */ ((PLATFORM2) => {
    PLATFORM2["WEB"] = "web";
    PLATFORM2["IOS"] = "ios";
    PLATFORM2["ANDROID"] = "android";
    PLATFORM2["UNKNOWN"] = "unknown";
    return PLATFORM2;
  })(PLATFORM || {});
  var EVENT_TYPE = /* @__PURE__ */ ((EVENT_TYPE2) => {
    EVENT_TYPE2["RECEIVE"] = "recv";
    EVENT_TYPE2["SEND"] = "send";
    return EVENT_TYPE2;
  })(EVENT_TYPE || {});
  var HANDLER = /* @__PURE__ */ ((HANDLER2) => {
    HANDLER2["BOTX"] = "botx";
    HANDLER2["EXPRESS"] = "express";
    return HANDLER2;
  })(HANDLER || {});
  const RESPONSE_TIMEOUT = 3e4;
  const WEB_COMMAND_TYPE = "smartapp";
  const WEB_COMMAND_TYPE_RPC = "smartapp_rpc";
  const WEB_COMMAND_TYPE_RPC_LOGS = "smartAppLogs";
  const getPlatformByGetParam = () => {
    const platform = new URLSearchParams(location.search).get("platform");
    const isValidPlatform = Object.values(PLATFORM).includes(platform);
    if (isValidPlatform) {
      return platform;
    }
    return PLATFORM.UNKNOWN;
  };
  const detectPlatformByUserAgent = () => {
    if (/android/i.test(navigator.userAgent)) {
      return PLATFORM.ANDROID;
    }
    if ((/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.userAgent.includes("Mac") && "ontouchend" in document) && !window.MSStream) {
      return PLATFORM.IOS;
    }
    return PLATFORM.WEB;
  };
  const getPlatform = () => {
    return getPlatformByGetParam() || detectPlatformByUserAgent();
  };
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function validate(uuid) {
    return typeof uuid === "string" && REGEX.test(uuid);
  }
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  const native = {
    randomUUID
  };
  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  function arrayMap(array, iteratee) {
    var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index2 < length) {
      result[index2] = iteratee(array[index2], index2, array);
    }
    return result;
  }
  var isArray = Array.isArray;
  const isArray$1 = isArray;
  var objectProto$1 = Object.prototype;
  var hasOwnProperty = objectProto$1.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$1.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  var INFINITY = 1 / 0;
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$1(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function baseSlice(array, start, end) {
    var index2 = -1, length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index2 < length) {
      result[index2] = array[index2 + start];
    }
    return result;
  }
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === void 0 ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
  }
  var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
  var rsZWJ$2 = "\\u200d";
  var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function asciiToArray(string) {
    return string.split("");
  }
  var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
  var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
  var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function createCaseFirst(methodName) {
    return function(string) {
      string = toString(string);
      var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  var upperFirst = createCaseFirst("toUpperCase");
  const upperFirst$1 = upperFirst;
  function capitalize(string) {
    return upperFirst$1(toString(string).toLowerCase());
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index2 = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[++index2];
    }
    while (++index2 < length) {
      accumulator = iteratee(accumulator, array[index2], index2, array);
    }
    return accumulator;
  }
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? void 0 : object[key];
    };
  }
  var deburredLetters = {
    // Latin-1 Supplement block.
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "Ç": "C",
    "ç": "c",
    "Ð": "D",
    "ð": "d",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "Ñ": "N",
    "ñ": "n",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "Ý": "Y",
    "ý": "y",
    "ÿ": "y",
    "Æ": "Ae",
    "æ": "ae",
    "Þ": "Th",
    "þ": "th",
    "ß": "ss",
    // Latin Extended-A block.
    "Ā": "A",
    "Ă": "A",
    "Ą": "A",
    "ā": "a",
    "ă": "a",
    "ą": "a",
    "Ć": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Č": "C",
    "ć": "c",
    "ĉ": "c",
    "ċ": "c",
    "č": "c",
    "Ď": "D",
    "Đ": "D",
    "ď": "d",
    "đ": "d",
    "Ē": "E",
    "Ĕ": "E",
    "Ė": "E",
    "Ę": "E",
    "Ě": "E",
    "ē": "e",
    "ĕ": "e",
    "ė": "e",
    "ę": "e",
    "ě": "e",
    "Ĝ": "G",
    "Ğ": "G",
    "Ġ": "G",
    "Ģ": "G",
    "ĝ": "g",
    "ğ": "g",
    "ġ": "g",
    "ģ": "g",
    "Ĥ": "H",
    "Ħ": "H",
    "ĥ": "h",
    "ħ": "h",
    "Ĩ": "I",
    "Ī": "I",
    "Ĭ": "I",
    "Į": "I",
    "İ": "I",
    "ĩ": "i",
    "ī": "i",
    "ĭ": "i",
    "į": "i",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "ĸ": "k",
    "Ĺ": "L",
    "Ļ": "L",
    "Ľ": "L",
    "Ŀ": "L",
    "Ł": "L",
    "ĺ": "l",
    "ļ": "l",
    "ľ": "l",
    "ŀ": "l",
    "ł": "l",
    "Ń": "N",
    "Ņ": "N",
    "Ň": "N",
    "Ŋ": "N",
    "ń": "n",
    "ņ": "n",
    "ň": "n",
    "ŋ": "n",
    "Ō": "O",
    "Ŏ": "O",
    "Ő": "O",
    "ō": "o",
    "ŏ": "o",
    "ő": "o",
    "Ŕ": "R",
    "Ŗ": "R",
    "Ř": "R",
    "ŕ": "r",
    "ŗ": "r",
    "ř": "r",
    "Ś": "S",
    "Ŝ": "S",
    "Ş": "S",
    "Š": "S",
    "ś": "s",
    "ŝ": "s",
    "ş": "s",
    "š": "s",
    "Ţ": "T",
    "Ť": "T",
    "Ŧ": "T",
    "ţ": "t",
    "ť": "t",
    "ŧ": "t",
    "Ũ": "U",
    "Ū": "U",
    "Ŭ": "U",
    "Ů": "U",
    "Ű": "U",
    "Ų": "U",
    "ũ": "u",
    "ū": "u",
    "ŭ": "u",
    "ů": "u",
    "ű": "u",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "Ż": "Z",
    "Ž": "Z",
    "ź": "z",
    "ż": "z",
    "ž": "z",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Œ": "Oe",
    "œ": "oe",
    "ŉ": "'n",
    "ſ": "s"
  };
  var deburrLetter = basePropertyOf(deburredLetters);
  const deburrLetter$1 = deburrLetter;
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
  var rsCombo$1 = "[" + rsComboRange$1 + "]";
  var reComboMark = RegExp(rsCombo$1, "g");
  function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
  }
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
  var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
  var reUnicodeWord = RegExp([
    rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
    rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
    rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
    rsUpper + "+" + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join("|"), "g");
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }
  function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? void 0 : pattern;
    if (pattern === void 0) {
      return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
  }
  var rsApos = "['’]";
  var reApos = RegExp(rsApos, "g");
  function createCompounder(callback) {
    return function(string) {
      return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
    };
  }
  var camelCase = createCompounder(function(result, word, index2) {
    word = word.toLowerCase();
    return result + (index2 ? capitalize(word) : word);
  });
  const camelCase$1 = camelCase;
  var snakeCase = createCompounder(function(result, word, index2) {
    return result + (index2 ? "_" : "") + word.toLowerCase();
  });
  const snakeCase$1 = snakeCase;
  const snakeCaseToCamelCase = (data) => {
    var _a;
    if (Array.isArray(data)) {
      return data.map(snakeCaseToCamelCase);
    }
    if (!data || ((_a = data.constructor) == null ? void 0 : _a.name) !== "Object") {
      return data;
    }
    return Object.keys(data).reduce((result, key) => {
      const value = snakeCaseToCamelCase(data[key]);
      const keyValue = validate(key) ? key : camelCase$1(key);
      return __spreadProps(__spreadValues({}, result), { [keyValue]: value });
    }, {});
  };
  const camelCaseToSnakeCase = (data) => {
    var _a;
    if (Array.isArray(data)) {
      return data.map(camelCaseToSnakeCase);
    }
    if (!data || ((_a = data.constructor) == null ? void 0 : _a.name) !== "Object") {
      return data;
    }
    return Object.keys(data).reduce((result, key) => {
      const value = camelCaseToSnakeCase(data[key]);
      return __spreadProps(__spreadValues({}, result), { [snakeCase$1(key)]: value });
    }, {});
  };
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var eventemitter3 = { exports: {} };
  (function(module2) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module2.exports = EventEmitter2;
    }
  })(eventemitter3);
  var eventemitter3Exports = eventemitter3.exports;
  const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
  class ExtendedEventEmitter extends EventEmitter {
    constructor() {
      super();
    }
    /**
     * Wait when event with `type` will be emitted for `timeout` ms.
     *
     * ```js
     * emitter.onceWithTimeout('d6910a9d-ea24-5fc6-a654-28781ef21f8f', 20000)
     * // => Promise
     * ```
     * @param type - Event type, uuid or EVENT_TYPE.RECV for standalone events from client
     * @param timeout - Timeout in ms
     * @returns Promise.
     */
    onceWithTimeout(type, timeout) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          console.error("Bridge ~ Timeout event", timer);
          reject(new Error("Bridge ~ Timeout event"));
        }, timeout);
        this.once(type, (event) => {
          clearTimeout(timer);
          resolve(event);
        });
      });
    }
  }
  const log = (...args) => {
    const text = args.map((arg) => typeof arg === "string" ? arg : JSON.stringify(arg)).join(" ");
    alert(text);
  };
  class AndroidBridge {
    constructor() {
      __publicField(this, "eventEmitter");
      __publicField(this, "hasCommunicationObject");
      __publicField(this, "logsEnabled");
      __publicField(this, "isRenameParamsEnabled");
      this.hasCommunicationObject = typeof window.express !== "undefined" && !!window.express.handleSmartAppEvent;
      this.eventEmitter = new ExtendedEventEmitter();
      this.logsEnabled = false;
      this.isRenameParamsEnabled = true;
      if (!this.hasCommunicationObject) {
        log('Method "express.handleSmartAppEvent" not available, cannot send message to Android');
        return;
      }
      window.handleAndroidEvent = ({
        ref,
        data,
        files
      }) => {
        if (this.logsEnabled) {
          console.log("Bridge ~ Incoming event", JSON.stringify({ ref, data, files }, null, 2));
        }
        const _a = data, { type } = _a, payload = __objRest(_a, ["type"]);
        const emitterType = ref || EVENT_TYPE.RECEIVE;
        const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => snakeCaseToCamelCase(file)) : files;
        const event = {
          ref,
          type,
          payload: this.isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
          files: eventFiles
        };
        this.eventEmitter.emit(emitterType, event);
      };
    }
    /**
     * Set callback function to handle events without **ref**
     * (notifications for example).
     *
     * ```js
     * bridge.onReceive(({ type, handler, payload }) => {
     *   // Handle event data
     *   console.log('event', type, handler, payload)
     * })
     * ```
     * @param callback - Callback function.
     */
    onReceive(callback) {
      this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
    }
    sendEvent({
      handler,
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required = false
    }) {
      if (!this.hasCommunicationObject) {
        return Promise.reject(new Error('Method "express.handleSmartAppEvent" not available, cannot send message to Android'));
      }
      const ref = v4();
      const eventParams = {
        ref,
        type: WEB_COMMAND_TYPE_RPC,
        method,
        handler,
        payload: this.isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
        guaranteed_delivery_required
      };
      const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => camelCaseToSnakeCase(file)) : files;
      const event = JSON.stringify(files ? __spreadProps(__spreadValues({}, eventParams), { files: eventFiles }) : eventParams);
      if (this.logsEnabled) {
        console.log("Bridge ~ Outgoing event", JSON.stringify(event, null, "  "));
      }
      window.express.handleSmartAppEvent(event);
      return this.eventEmitter.onceWithTimeout(ref, timeout);
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendBotEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *       files: []
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param files
     * @param timeout - Timeout in ms.
     * @param guaranteed_delivery_required - boolean.
     * @returns Promise.
     */
    sendBotEvent({ method, params, files, timeout, guaranteed_delivery_required }) {
      return this.sendEvent({ handler: HANDLER.BOTX, method, params, files, timeout, guaranteed_delivery_required });
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       type: 'get_weather',
     *       handler: 'express',
     *       payload: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param timeout - Timeout in ms.
     * @returns Promise.
     */
    sendClientEvent({ method, params, timeout }) {
      return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
    }
    /**
     * Enabling logs.
     *
     * ```js
     * bridge
     *   .enableLogs()
     * ```
     */
    enableLogs() {
      this.logsEnabled = true;
    }
    /**
     * Disabling logs.
     *
     * ```js
     * bridge
     *   .disableLogs()
     * ```
     */
    disableLogs() {
      this.logsEnabled = false;
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .enableRenameParams()
     * ```
     */
    enableRenameParams() {
      this.isRenameParamsEnabled = true;
      console.log("Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa");
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .disableRenameParams()
     * ```
     */
    disableRenameParams() {
      this.isRenameParamsEnabled = false;
      console.log("Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa");
    }
  }
  class IosBridge {
    constructor() {
      __publicField(this, "eventEmitter");
      __publicField(this, "hasCommunicationObject");
      __publicField(this, "logsEnabled");
      __publicField(this, "isRenameParamsEnabled");
      this.hasCommunicationObject = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.express && !!window.webkit.messageHandlers.express.postMessage;
      this.eventEmitter = new ExtendedEventEmitter();
      this.logsEnabled = false;
      this.isRenameParamsEnabled = true;
      if (!this.hasCommunicationObject) {
        log('Method "express.postMessage" not available, cannot send message to iOS');
        return;
      }
      window.handleIosEvent = ({
        ref,
        data,
        files
      }) => {
        if (this.logsEnabled) {
          console.log(
            "Bridge ~ Incoming event",
            JSON.stringify(
              {
                ref,
                data,
                files
              },
              null,
              2
            )
          );
        }
        const _a = data, { type } = _a, payload = __objRest(_a, ["type"]);
        const emitterType = ref || EVENT_TYPE.RECEIVE;
        const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => snakeCaseToCamelCase(file)) : files;
        const event = {
          ref,
          type,
          payload: this.isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
          files: eventFiles
        };
        this.eventEmitter.emit(emitterType, event);
      };
    }
    /**
     * Set callback function to handle events without **ref**
     * (notifications for example).
     *
     * ```js
     * bridge.onRecieve(({ type, handler, payload }) => {
     *   // Handle event data
     *   console.log('event', type, handler, payload)
     * })
     * ```
     * @param callback - Callback function.
     */
    onReceive(callback) {
      this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
    }
    sendEvent({
      handler,
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required = false
    }) {
      if (!this.hasCommunicationObject) {
        return Promise.reject(new Error('Method "express.postMessage" not available, cannot send message to iOS'));
      }
      const ref = v4();
      const eventProps = {
        ref,
        type: WEB_COMMAND_TYPE_RPC,
        method,
        handler,
        payload: this.isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
        guaranteed_delivery_required
      };
      const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => camelCaseToSnakeCase(file)) : files;
      const event = files ? __spreadProps(__spreadValues({}, eventProps), { files: eventFiles }) : eventProps;
      if (this.logsEnabled) {
        console.log("Bridge ~ Outgoing event", JSON.stringify(event, null, "  "));
      }
      window.webkit.messageHandlers.express.postMessage(event);
      return this.eventEmitter.onceWithTimeout(ref, timeout);
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendBotEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *       files: []
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param files
     * @param timeout - Timeout in ms.
     * @param guaranteed_delivery_required - boolean.
     */
    sendBotEvent({
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required
    }) {
      return this.sendEvent({ handler: HANDLER.BOTX, method, params, files, timeout, guaranteed_delivery_required });
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       type: 'get_weather',
     *       handler: 'express',
     *       payload: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param timeout - Timeout in ms.
     */
    sendClientEvent({ method, params, timeout = RESPONSE_TIMEOUT }) {
      return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
    }
    /**
     * Enabling logs.
     *
     * ```js
     * bridge
     *   .enableLogs()
     * ```
     */
    enableLogs() {
      this.logsEnabled = true;
    }
    /**
     * Disabling logs.
     *
     * ```js
     * bridge
     *   .disableLogs()
     * ```
     */
    disableLogs() {
      this.logsEnabled = false;
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .enableRenameParams()
     * ```
     */
    enableRenameParams() {
      this.isRenameParamsEnabled = true;
      console.log("Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa");
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .disableRenameParams()
     * ```
     */
    disableRenameParams() {
      this.isRenameParamsEnabled = false;
      console.log("Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa");
    }
  }
  class WebBridge {
    constructor() {
      __publicField(this, "eventEmitter");
      __publicField(this, "logsEnabled");
      __publicField(this, "isRenameParamsEnabled");
      this.eventEmitter = new ExtendedEventEmitter();
      this.addGlobalListener();
      this.logsEnabled = false;
      this.isRenameParamsEnabled = true;
    }
    addGlobalListener() {
      window.addEventListener("message", (event) => {
        const isRenameParamsWasEnabled = this.isRenameParamsEnabled;
        if (getPlatform() === PLATFORM.WEB && event.data.handler === HANDLER.EXPRESS && this.isRenameParamsEnabled) {
          this.isRenameParamsEnabled = false;
        }
        if (typeof event.data !== "object" || typeof event.data.data !== "object" || typeof event.data.data.type !== "string") {
          return;
        }
        if (this.logsEnabled) {
          console.log("Bridge ~ Incoming event", event.data);
        }
        const _a = event.data, {
          ref,
          data: _b
        } = _a, _c = _b, { type } = _c, payload = __objRest(_c, ["type"]), {
          files
        } = _a;
        const emitterType = ref || EVENT_TYPE.RECEIVE;
        const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => snakeCaseToCamelCase(file)) : files;
        this.eventEmitter.emit(emitterType, {
          ref,
          type,
          payload: this.isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
          files: eventFiles
        });
        if (isRenameParamsWasEnabled) {
          this.isRenameParamsEnabled = true;
        }
      });
    }
    /**
     * Set callback function to handle events without **ref**
     * (notifications for example).
     *
     * ```js
     * bridge.onReceive(({ type, handler, payload }) => {
     *   // Handle event data
     *   console.log('event', type, handler, payload)
     * })
     * ```
     * @param callback - Callback function.
     */
    onReceive(callback) {
      this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
    }
    sendEvent({
      handler,
      method,
      params,
      files,
      timeout = RESPONSE_TIMEOUT,
      guaranteed_delivery_required = false
    }) {
      const isRenameParamsWasEnabled = this.isRenameParamsEnabled;
      if (getPlatform() === PLATFORM.WEB && handler === HANDLER.EXPRESS && this.isRenameParamsEnabled) {
        this.disableRenameParams();
      }
      const ref = v4();
      const payload = {
        ref,
        type: WEB_COMMAND_TYPE_RPC,
        method,
        handler,
        payload: this.isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
        guaranteed_delivery_required
      };
      const eventFiles = this.isRenameParamsEnabled ? files == null ? void 0 : files.map((file) => camelCaseToSnakeCase(file)) : files;
      const event = files ? __spreadProps(__spreadValues({}, payload), { files: eventFiles }) : payload;
      if (this.logsEnabled) {
        console.log("Bridge ~ Outgoing event", event);
      }
      window.parent.postMessage(
        {
          type: WEB_COMMAND_TYPE,
          payload: event
        },
        "*"
      );
      if (isRenameParamsWasEnabled) {
        this.enableRenameParams();
      }
      return this.eventEmitter.onceWithTimeout(ref, timeout);
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param files
     * @param is_rename_params_fields - boolean.
     * @param timeout - Timeout in ms.
     * @param guaranteed_delivery_required - boolean.
     */
    sendBotEvent({
      method,
      params,
      files,
      timeout,
      guaranteed_delivery_required
    }) {
      return this.sendEvent({
        handler: HANDLER.BOTX,
        method,
        params,
        files,
        timeout,
        guaranteed_delivery_required
      });
    }
    /**
     * Send event and wait response from express client.
     *
     * ```js
     * bridge
     *   .sendClientEvent(
     *     {
     *       method: 'get_weather',
     *       params: {
     *         city: 'Moscow',
     *       },
     *     }
     *   )
     *   .then(data => {
     *     // Handle response
     *     console.log('response', data)
     *   })
     * ```
     * @param method - Event type.
     * @param params
     * @param timeout - Timeout in ms.
     */
    sendClientEvent({ method, params, timeout }) {
      return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
    }
    /**
     * Enabling logs.
     *
     * ```js
     * bridge
     *   .enableLogs()
     * ```
     */
    enableLogs() {
      this.logsEnabled = true;
      const _log = console.log;
      console.log = function(...rest) {
        window.parent.postMessage(
          {
            type: WEB_COMMAND_TYPE_RPC_LOGS,
            payload: rest
          },
          "*"
        );
        _log.apply(console, rest);
      };
    }
    /**
     * Disabling logs.
     *
     * ```js
     * bridge
     *   .disableLogs()
     * ```
     */
    disableLogs() {
      this.logsEnabled = false;
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .enableRenameParams()
     * ```
     */
    enableRenameParams() {
      this.isRenameParamsEnabled = true;
      console.log("Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa");
    }
    /**
     * Enabling renaming event params from camelCase to snake_case and vice versa
     * ```js
     * bridge
     *    .disableRenameParams()
     * ```
     */
    disableRenameParams() {
      this.isRenameParamsEnabled = false;
      console.log("Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa");
    }
  }
  const LIB_VERSION = "1.2.5";
  const getBridge = () => {
    const platform = getPlatform();
    console.log("Bridge ~ version", LIB_VERSION);
    switch (platform) {
      case PLATFORM.ANDROID:
        return new AndroidBridge();
      case PLATFORM.IOS:
        return new IosBridge();
      case PLATFORM.WEB:
        return new WebBridge();
      default:
        console.error("Bridge ~ Wrong platform");
        break;
    }
    return null;
  };
  const index = getBridge();
  return index;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRhcHAtYnJpZGdlLnVtZC5janMiLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvY29uc3RhbnRzLnRzIiwiLi4vc3JjL2xpYi9wbGF0Zm9ybURldGVjdG9yLnRzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjAvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjAvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4wL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjAvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlNYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNTeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRvU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nhc3RTbGljZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNVbmljb2RlLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FzY2lpVG9BcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL191bmljb2RlVG9BcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb0FycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUNhc2VGaXJzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3VwcGVyRmlyc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jYXBpdGFsaXplLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5UmVkdWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2RlYnVyckxldHRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2RlYnVyci5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc2NpaVdvcmRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc1VuaWNvZGVXb3JkLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3VuaWNvZGVXb3Jkcy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3dvcmRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUNvbXBvdW5kZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jYW1lbENhc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zbmFrZUNhc2UuanMiLCIuLi9zcmMvbGliL2Nhc2UudHMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vZXZlbnRlbWl0dGVyM0A1LjAuMS9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIi4uL3NyYy9saWIvZXZlbnRFbWl0dGVyLnRzIiwiLi4vc3JjL2xpYi9sb2dnZXIudHMiLCIuLi9zcmMvbGliL3BsYXRmb3Jtcy9hbmRyb2lkLnRzIiwiLi4vc3JjL2xpYi9wbGF0Zm9ybXMvaW9zLnRzIiwiLi4vc3JjL2xpYi9wbGF0Zm9ybXMvd2ViLnRzIiwiLi4vc3JjL3ZlcnNpb24udHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIlBMQVRGT1JNIiwiRVZFTlRfVFlQRSIsIkhBTkRMRVIiLCJmcmVlR2xvYmFsIiwiU3ltYm9sIiwicm9vdCIsImluZGV4Iiwib2JqZWN0UHJvdG8iLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsInN5bVRvU3RyaW5nVGFnIiwiaXNBcnJheSIsInJzQXN0cmFsUmFuZ2UiLCJyc0NvbWJvTWFya3NSYW5nZSIsInJlQ29tYm9IYWxmTWFya3NSYW5nZSIsInJzQ29tYm9TeW1ib2xzUmFuZ2UiLCJyc0NvbWJvUmFuZ2UiLCJyc1ZhclJhbmdlIiwicnNaV0oiLCJyc0NvbWJvIiwicnNGaXR6IiwicnNNb2RpZmllciIsInJzTm9uQXN0cmFsIiwicnNSZWdpb25hbCIsInJzU3VyclBhaXIiLCJyZU9wdE1vZCIsInJzT3B0VmFyIiwicnNPcHRKb2luIiwicnNTZXEiLCJ1cHBlckZpcnN0IiwiZGVidXJyTGV0dGVyIiwicnNBcG9zIiwiaXNVdWlkIiwiY2FtZWxDYXNlIiwic25ha2VDYXNlIiwiRXZlbnRFbWl0dGVyIiwibW9kdWxlIiwidXVpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVksTUFBQSw2QkFBQUEsY0FBTDtBQUNMQSxjQUFBLEtBQU0sSUFBQTtBQUNOQSxjQUFBLEtBQU0sSUFBQTtBQUNOQSxjQUFBLFNBQVUsSUFBQTtBQUNWQSxjQUFBLFNBQVUsSUFBQTtBQUpBQSxXQUFBQTtBQUFBQSxFQUFBLEdBQUEsWUFBQSxDQUFBLENBQUE7QUFPQSxNQUFBLCtCQUFBQyxnQkFBTDtBQUNMQSxnQkFBQSxTQUFVLElBQUE7QUFDVkEsZ0JBQUEsTUFBTyxJQUFBO0FBRkdBLFdBQUFBO0FBQUFBLEVBQUEsR0FBQSxjQUFBLENBQUEsQ0FBQTtBQUtBLE1BQUEsNEJBQUFDLGFBQUw7QUFDTEEsYUFBQSxNQUFPLElBQUE7QUFDUEEsYUFBQSxTQUFVLElBQUE7QUFGQUEsV0FBQUE7QUFBQUEsRUFBQSxHQUFBLFdBQUEsQ0FBQSxDQUFBO0FBS0wsUUFBTSxtQkFBbUI7QUFDekIsUUFBTSxtQkFBbUI7QUFDekIsUUFBTSx1QkFBdUI7QUFDN0IsUUFBTSw0QkFBNEI7QUNsQnpDLFFBQU0sd0JBQXdCLE1BQWdCO0FBQzVDLFVBQU0sV0FBVyxJQUFJLGdCQUFnQixTQUFTLE1BQU0sRUFBRSxJQUFJLFVB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S0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQ2hELEtBQVE7QUFBQSxJQUFNLEtBQVE7QUFBQSxJQUFLLEtBQVE7QUFBQSxJQUFLLEtBQVE7QUFBQSxJQUNoRCxLQUFRO0FBQUEsSUFBTSxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFDaEQsS0FBUTtBQUFBLElBQU0sS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQ2hELEtBQVE7QUFBQSxJQUFNLEtBQVE7QUFBQSxJQUN0QixLQUFRO0FBQUEsSUFBTSxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFDMUUsS0FBUTtBQUFBLElBQU0sS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQzFFLEtBQVE7QUFBQSxJQUFNLEtBQVE7QUFBQSxJQUFLLEtBQVE7QUFBQSxJQUFLLEtBQVE7QUFBQSxJQUNoRCxLQUFRO0FBQUEsSUFBTSxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFBSyxLQUFRO0FBQUEsSUFDaEQsS0FBUTtBQUFBLElBQU0sS0FBUTtBQUFBLElBQUssS0FBUTtBQUFBLElBQ25DLEtBQVE7QUFBQSxJQUFNLEtBQVE7QUFBQSxJQUN0QixLQUFRO0FBQUEsSUFBTSxLQUFRO0FBQUEsSUFDdEIsS0FBUTtBQUFBO0FBQUEsSUFFUixLQUFVO0FBQUEsSUFBTSxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFDekMsS0FBVTtBQUFBLElBQU0sS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQ3pDLEtBQVU7QUFBQSxJQUFNLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUN4RCxLQUFVO0FBQUEsSUFBTSxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFDeEQsS0FBVTtBQUFBLElBQU0sS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQ3hELEtBQVU7QUFBQSxJQUFNLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUN2RSxLQUFVO0FBQUEsSUFBTSxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFDdkUsS0FBVTtBQUFBLElBQU0sS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQ3hELEtBQVU7QUFBQSxJQUFNLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUN4RCxLQUFVO0FBQUEsSUFBTSxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFDeEQsS0FBVTtBQUFBLElBQU0sS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQ3ZFLEtBQVU7QUFBQSxJQUFNLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUN2RSxLQUFVO0FBQUEsSUFBTSxLQUFVO0FBQUEsSUFDMUIsS0FBVTtBQUFBLElBQU0sS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQ3pDLEtBQVU7QUFBQSxJQUFNLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUN2RSxLQUFVO0FBQUEsSUFBTSxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFBSyxLQUFVO0FBQUEsSUFDdkUsS0FBVTtBQUFBLElBQU0sS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQUssS0FBVTtBQUFBLElBQ3hELEtBQVU7QUFBQSxJQUFNLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUFLLEtBQVU7QUFBQSxJQUN4RCxLQUFVO0FBQUEs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RTVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBVUEsY0FBYztBQUNaLFdBQUssY0FBYztBQUFBLElBQ3JCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNBLHFCQUFxQjtBQUNuQixXQUFLLHdCQUF3QjtBQUM3QixjQUFRLElBQUksb0ZBQW9GO0FBQUEsSUFDbEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU0Esc0JBQXNCO0FBQ3BCLFdBQUssd0JBQXdCO0FBQzdCLGNBQVEsSUFBSSxxRkFBcUY7QUFBQSxJQUNuRztBQUFBLEVBQ0Y7QUM1UWEsUUFBQSxjQUFjO0FDUTNCLFFBQU0sWUFBWSxNQUFxQjtBQUtyQyxVQUFNLFdBQVc7QUFDVCxZQUFBLElBQUksb0JBQW9CLFdBQVc7QUFFM0MsWUFBUSxVQUFVO0FBQUEsTUFDaEIsS0FBSyxTQUFTO0FBQ1osZUFBTyxJQUFJLGNBQWM7QUFBQSxNQUMzQixLQUFLLFNBQVM7QUFDWixlQUFPLElBQUksVUFBVTtBQUFBLE1BQ3ZCLEtBQUssU0FBUztBQUNaLGVBQU8sSUFBSSxVQUFVO0FBQUEsTUFDdkI7QUFDRSxnQkFBUSxNQUFNLHlCQUF5QjtBQUN2QztBQUFBLElBQ0o7QUFFTyxXQUFBO0FBQUEsRUFDVDtBQUVBLFFBQUEsUUFBZSxVQUFVOzs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MV19

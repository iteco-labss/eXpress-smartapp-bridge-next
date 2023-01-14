var __defProp = Object.defineProperty;
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
(function(module) {
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
    module.exports = EventEmitter2;
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
export {
  index as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRhcHAtYnJpZGdlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbGliL2NvbnN0YW50cy50cyIsIi4uL3NyYy9saWIvcGxhdGZvcm1EZXRlY3Rvci50cyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4wL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjAvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4wL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vdXVpZEA5LjAuMC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS91dWlkQDkuMC4wL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3V1aWRAOS4wLjAvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TWFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VUb1N0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3RvU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTbGljZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0U2xpY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzVW5pY29kZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc2NpaVRvQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdW5pY29kZVRvQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RyaW5nVG9BcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVDYXNlRmlyc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy91cHBlckZpcnN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvY2FwaXRhbGl6ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheVJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUHJvcGVydHlPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19kZWJ1cnJMZXR0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9kZWJ1cnIuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXNjaWlXb3Jkcy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNVbmljb2RlV29yZC5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL191bmljb2RlV29yZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoLWVzQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy93b3Jkcy5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2gtZXNANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVDb21wb3VuZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvY2FtZWxDYXNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaC1lc0A0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc25ha2VDYXNlLmpzIiwiLi4vc3JjL2xpYi9jYXNlLnRzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjEvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCIuLi9zcmMvbGliL2V2ZW50RW1pdHRlci50cyIsIi4uL3NyYy9saWIvbG9nZ2VyLnRzIiwiLi4vc3JjL2xpYi9wbGF0Zm9ybXMvYW5kcm9pZC50cyIsIi4uL3NyYy9saWIvcGxhdGZvcm1zL2lvcy50cyIsIi4uL3NyYy9saWIvcGxhdGZvcm1zL3dlYi50cyIsIi4uL3NyYy92ZXJzaW9uLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJQTEFURk9STSIsIkVWRU5UX1RZUEUiLCJIQU5ETEVSIiwiZnJlZUdsb2JhbCIsIlN5bWJvbCIsInJvb3QiLCJpbmRleCIsIm9iamVjdFByb3RvIiwibmF0aXZlT2JqZWN0VG9TdHJpbmciLCJzeW1Ub1N0cmluZ1RhZyIsImlzQXJyYXkiLCJyc0FzdHJhbFJhbmdlIiwicnNDb21ib01hcmtzUmFuZ2UiLCJyZUNvbWJvSGFsZk1hcmtzUmFuZ2UiLCJyc0NvbWJvU3ltYm9sc1JhbmdlIiwicnNDb21ib1JhbmdlIiwicnNWYXJSYW5nZSIsInJzWldKIiwicnNDb21ibyIsInJzRml0eiIsInJzTW9kaWZpZXIiLCJyc05vbkFzdHJhbCIsInJzUmVnaW9uYWwiLCJyc1N1cnJQYWlyIiwicmVPcHRNb2QiLCJyc09wdFZhciIsInJzT3B0Sm9pbiIsInJzU2VxIiwidXBwZXJGaXJzdCIsImRlYnVyckxldHRlciIsInJzQXBvcyIsImlzVXVpZCIsImNhbWVsQ2FzZSIsInNuYWtlQ2FzZSIsIkV2ZW50RW1pdHRlciIsInV1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVksSUFBQSw2QkFBQUEsY0FBTDtBQUNMQSxZQUFBLEtBQU0sSUFBQTtBQUNOQSxZQUFBLEtBQU0sSUFBQTtBQUNOQSxZQUFBLFNBQVUsSUFBQTtBQUNWQSxZQUFBLFNBQVUsSUFBQTtBQUpBQSxTQUFBQTtBQUFBLEdBQUEsWUFBQSxDQUFBLENBQUE7QUFPQSxJQUFBLCtCQUFBQyxnQkFBTDtBQUNMQSxjQUFBLFNBQVUsSUFBQTtBQUNWQSxjQUFBLE1BQU8sSUFBQTtBQUZHQSxTQUFBQTtBQUFBLEdBQUEsY0FBQSxDQUFBLENBQUE7QUFLQSxJQUFBLDRCQUFBQyxhQUFMO0FBQ0xBLFdBQUEsTUFBTyxJQUFBO0FBQ1BBLFdBQUEsU0FBVSxJQUFBO0FBRkFBLFNBQUFBO0FBQUEsR0FBQSxXQUFBLENBQUEsQ0FBQTtBQUtMLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sNEJBQTRCO0FDbEJ6QyxNQUFNLHdCQUF3QixNQUFnQjtBQUM1QyxRQUFNLFdBQVcsSUFBSSxnQkFBZ0IsU0FBUyxNQUFNLEVBQUUsSUFBSSxVQUFVO0FBRXBFLFFBQU0sa0JBQWtCLE9BQU8sT0FBTyxRQUFRLEVB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RUFBTSxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFDaEQsS0FBUTtBQUFBLEVBQU0sS0FBUTtBQUFBLEVBQ3RCLEtBQVE7QUFBQSxFQUFNLEtBQVE7QUFBQSxFQUFLLEtBQVE7QUFBQSxFQUFLLEtBQVE7QUFBQSxFQUFLLEtBQVE7QUFBQSxFQUFLLEtBQVE7QUFBQSxFQUMxRSxLQUFRO0FBQUEsRUFBTSxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFDMUUsS0FBUTtBQUFBLEVBQU0sS0FBUTtBQUFBLEVBQUssS0FBUTtBQUFBLEVBQUssS0FBUTtBQUFBLEVBQ2hELEtBQVE7QUFBQSxFQUFNLEtBQVE7QUFBQSxFQUFLLEtBQVE7QUFBQSxFQUFLLEtBQVE7QUFBQSxFQUNoRCxLQUFRO0FBQUEsRUFBTSxLQUFRO0FBQUEsRUFBSyxLQUFRO0FBQUEsRUFDbkMsS0FBUTtBQUFBLEVBQU0sS0FBUTtBQUFBLEVBQ3RCLEtBQVE7QUFBQSxFQUFNLEtBQVE7QUFBQSxFQUN0QixLQUFRO0FBQUE7QUFBQSxFQUVSLEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUN6QyxLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDekMsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3hELEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUN4RCxLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDeEQsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3ZFLEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUN2RSxLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDeEQsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3hELEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUN4RCxLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDdkUsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3ZFLEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUMxQixLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDekMsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3ZFLEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUN2RSxLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDeEQsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3hELEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7QUFBQSxFQUN6QyxLQUFVO0FBQUEsRUFBTSxLQUFVO0FBQUEsRUFBSyxLQUFVO0FBQUEsRUFDekMsS0FBVTtBQUFBLEVBQU0sS0FBVTtBQUFBLEVBQUssS0FBVTtBQUFBLEVBQ3pDLEtBQVU7QUFBQSxFQUFNLEtBQVU7QUFBQSxFQUFLLEtBQVU7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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNBLHNCQUFzQjtBQUNwQixTQUFLLHdCQUF3QjtBQUM3QixZQUFRLElBQUkscUZBQXFGO0FBQUEsRUFDbkc7QUFDRjtBQzVRYSxNQUFBLGNBQWM7QUNRM0IsTUFBTSxZQUFZLE1BQXFCO0FBS3JDLFFBQU0sV0FBVztBQUNULFVBQUEsSUFBSSxvQkFBb0IsV0FBVztBQUUzQyxVQUFRLFVBQVU7QUFBQSxJQUNoQixLQUFLLFNBQVM7QUFDWixhQUFPLElBQUksY0FBYztBQUFBLElBQzNCLEtBQUssU0FBUztBQUNaLGFBQU8sSUFBSSxVQUFVO0FBQUEsSUFDdkIsS0FBSyxTQUFTO0FBQ1osYUFBTyxJQUFJLFVBQVU7QUFBQSxJQUN2QjtBQUNFLGNBQVEsTUFBTSx5QkFBeUI7QUFDdkM7QUFBQSxFQUNKO0FBRU8sU0FBQTtBQUNUO0FBRUEsTUFBQSxRQUFlLFVBQVU7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MV19

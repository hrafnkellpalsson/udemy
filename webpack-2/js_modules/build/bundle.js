/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _big = __webpack_require__(3);

var _big2 = _interopRequireDefault(_big);

var _small = __webpack_require__(4);

var _small2 = _interopRequireDefault(_small);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = document.createElement('img');
image.src = _small2.default;

document.body.appendChild(image);

var bigImage = document.createElement('img');
bigImage.src = _big2.default;

document.body.appendChild(bigImage);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sum = function sum(a, b) {
  return a + b;
};

// module.exports = sum; // JSCommon
exports.default = sum;

/***/ },
/* 2 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4e0afb62a08f3b45244fb501784c005d.jpeg";

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _sum = __webpack_require__(1);

var _sum2 = _interopRequireDefault(_sum);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const sum = require('./sum'); // JSCommon
var total = (0, _sum2.default)(10, 5);
console.log(total);

/***/ }
/******/ ]);
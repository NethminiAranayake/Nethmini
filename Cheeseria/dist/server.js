/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar cheeses = __webpack_require__(/*! ./data/cheeses.json */ \"./src/server/data/cheeses.json\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar router = express.Router();\nrouter.get('/api/cheeses', function (req, res, next) {\n    res.json(cheeses);\n});\nrouter.get('/api/recent_purchases', function (req, res, next) {\n    var jsonPath = path.join(__dirname, '..', 'src', 'server', 'data');\n    var files = fs.readdirSync(jsonPath)\n        .filter(function (file) { return fs.lstatSync(path.join(jsonPath, file)).isFile(); })\n        .map(function (file) { return ({ file: file, mtime: fs.lstatSync(path.join(jsonPath, file)).mtime }); })\n        .sort(function (a, b) { return b.mtime.getTime() - a.mtime.getTime(); });\n    var file_name = files.length ? files[0]['file'] : undefined;\n    var rawdata = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'server', 'data', file_name));\n    var recent_purchases = JSON.parse(rawdata);\n    res.json(recent_purchases);\n});\nexports.default = router;\n\n\n//# sourceURL=webpack://react-shopping-cart/./src/server/routes.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\nvar app = express();\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar path = __webpack_require__(/*! path */ \"path\");\napp.use(express.static('public'));\napp.use(routes_1.default);\napp.use(express.json());\napp.use(express.urlencoded());\napp.post('/api/purchases', function (req, res, next) {\n    var ts = Date.now();\n    var data = JSON.stringify(req.body, null, 2);\n    var file_name = 'purchase_' + ts + '.json';\n    var jsonPath = path.join(__dirname, '..', 'src', 'server', 'data', file_name);\n    fs.writeFile(jsonPath, data, finished);\n    function finished() {\n        res.send(\"successful\");\n    }\n});\napp.get('/api/recent_purchases', function (req, res, next) {\n    var jsonPath = path.join(__dirname, '..', 'src', 'server', 'data');\n    var files = fs.readdirSync(jsonPath)\n        .filter(function (file) { return fs.lstatSync(path.join(jsonPath, file)).isFile(); })\n        .map(function (file) { return ({ file: file, mtime: fs.lstatSync(path.join(jsonPath, file)).mtime }); })\n        .sort(function (a, b) { return b.mtime.getTime() - a.mtime.getTime(); });\n    //console.log(files.length ? files[0]['file'] : undefined);\n    var file_name = files.length ? files[0]['file'] : undefined;\n    var rawdata = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'server', 'data', file_name));\n    var recent_purchases = JSON.parse(rawdata);\n    //console.log(recent_purchases);\n    res.send(recent_purchases);\n});\nvar port = process.env.PORT || 3000;\napp.listen(port, function () { return console.log(\"Server listening on port: \" + port); });\n\n\n//# sourceURL=webpack://react-shopping-cart/./src/server/server.ts?");

/***/ }),

/***/ "./src/server/data/cheeses.json":
/*!**************************************!*\
  !*** ./src/server/data/cheeses.json ***!
  \**************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"id\":1,\"title\":\"ABBAYE DE BELLOC\",\"price\":109.95,\"description\":\"Abbaye de Belloc is a flat wheel-shaped traditional, farmhouse, unpasteurised, semi-hard cheese made from sheep\\'s milk. It has a natural, crusty, brownish rind with patches of red, orange and yellow. The rind is marked with tiny craters.\",\"category\":\"creamy, dense and firm\",\"image\":\"https://www.cheese.com/media/img/cheese/Abbaye-de-Belloc.jpg\"},{\"id\":2,\"title\":\"ABBAYE DU MONT DES CATS\",\"price\":29.21,\"description\":\"The Abbaye du Mont des Cats cheese is made by monks in a monastery of the same name in the town of Godewaersvelde, in Northern France. Cow\\'s milk from local farms is used and the milk is gently pasteurised for cheese production. The maturation process takes about 4 to 5 weeks\",\"category\":\"semi-soft, artisan, brined\",\"image\":\"https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg\"},{\"id\":3,\"title\":\"ADELOST\",\"price\":367.55,\"description\":\"Adelost is a Swedish blue cheese made from cow\\'s milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.\",\"category\":\"semi-soft, blue-veined\",\"image\":\"https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg\"},{\"id\":4,\"title\":\"FETA\",\"price\":78.65,\"description\":\"Feta is undoubtedly one of the most famous Greek cheeses. In fact, Feta occupies 70% stake in Greek cheese consumption. To create traditional feta, 30 percent of goat\\'s milk is mixed with sheep\\'s milk of animals grazing on pastures in the specific appellation of origin regions.\",\"category\":\"soft, brined\",\"image\":\"https://www.cheese.com/media/img/cheese/504_feta.jpg\"},{\"id\":5,\"title\":\"JARLSBERG\",\"price\":88.15,\"description\":\"Jarlsberg is a mild, semi-soft cow’s milk cheese of Norwegian origin. Created by Anders Larsen Bakke, it resembles a Swiss Emmental with distinctive, open and irregular ‘eyes’. Many a times Jarlsberg is marketed as a Swiss cheese because of its characteristics, though it tends to be sweeter and stronger than Emmentaler.\",\"category\":\"open, smooth and supple\",\"image\":\"https://www.cheese.com/media/img/cheese/Jarlsberg_in_Wholefoods_2.jpg\"},{\"id\":6,\"title\":\"MAASDAM\",\"price\":140,\"description\":\"Maasdam is a traditional, semi-hard Dutch cheese made from cow’s milk. The most characteristic feature is its ‘eyes’ (holes) that make up most of the cheese. The cheese was created in the early 1990s as an alternative to more expensive Swiss Emmental cheese. It is a high-fat cheese with a minimum of 45% fat. Although similar to Emmental, the moisture content in Maasdam is more, making it suppler.\",\"category\":\"creamy, open and supple\",\"image\":\"https://www.cheese.com/media/img/cheese/wiki/maasdam.jpg\"},{\"id\":7,\"title\":\"ROYALP TILSIT\",\"price\":625.57,\"description\":\"oyalp Tilsit or Swiss Tilsit is a light yellow semi-hard smear-ripened cheese made from unpasteurised/pasteurised cow milk. The pasteurised version is mild in flavour whereas the one made from fresh, unpasteurised milk is more strongly flavoured (called Farmhouse Tilsit). It is aged for about 5 months, which makes it a very strong smelling cheese comparable to a Limburger.\",\"category\":\"semi-hard, smear-ripened\",\"image\":\"https://www.cheese.com/media/img/cheese/Tilsit_cheese_1.jpg\"},{\"id\":8,\"title\":\"SAINT ALBRAY\",\"price\":860.62,\"description\":\"Saint Albray is a flower-shaped cheese that comes from the Aquitaine region of France. Made with pasteurised cow\\'s milk and ripened for 2 weeks, it slices off skilfully with each half-pound cut looking like a \\\\\"petal\\\\\". When each petal comes together around a disk, they form a hollow centre similar to a flower.\",\"category\":\"soft, soft-ripened\",\"image\":\"https://www.cheese.com/media/img/cheese/12-saint-albray-shutterstock_1222710106.jpg\"}]');\n\n//# sourceURL=webpack://react-shopping-cart/./src/server/data/cheeses.json?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.ts");
/******/ 	
/******/ })()
;

"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/snakecase-keys";
exports.ids = ["vendor-chunks/snakecase-keys"];
exports.modules = {

/***/ "(rsc)/./node_modules/snakecase-keys/index.js":
/*!**********************************************!*\
  !*** ./node_modules/snakecase-keys/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(rsc)/./node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(rsc)/./node_modules/snake-case/dist.es2015/index.js\")\n\nconst PlainObjectConstructor = {}.constructor\n\nmodule.exports = function (obj, options) {\n  if (Array.isArray(obj)) {\n    if (obj.some(item => item.constructor !== PlainObjectConstructor)) {\n      throw new Error('obj must be array of plain objects')\n    }\n  } else {\n    if (obj.constructor !== PlainObjectConstructor) {\n      throw new Error('obj must be an plain object')\n    }\n  }\n\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val,\n      mapperOptions(key, val, options)\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n\nfunction mapperOptions (key, val, options) {\n  return options.shouldRecurse\n    ? { shouldRecurse: options.shouldRecurse(key, val) }\n    : undefined\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosWUFBWSxtQkFBTyxDQUFDLHNEQUFTO0FBQzdCLFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsd0VBQVk7O0FBRTFDLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsNkNBQTZDOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EiLCJzb3VyY2VzIjpbIi9ob21lL2Jhc2l0L3BlcnNvbmFsL0dQQS1DYWxjdWxhdG9yL25vZGVfbW9kdWxlcy9zbmFrZWNhc2Uta2V5cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuY29uc3QgbWFwID0gcmVxdWlyZSgnbWFwLW9iaicpXG5jb25zdCB7IHNuYWtlQ2FzZSB9ID0gcmVxdWlyZSgnc25ha2UtY2FzZScpXG5cbmNvbnN0IFBsYWluT2JqZWN0Q29uc3RydWN0b3IgPSB7fS5jb25zdHJ1Y3RvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIGlmIChvYmouc29tZShpdGVtID0+IGl0ZW0uY29uc3RydWN0b3IgIT09IFBsYWluT2JqZWN0Q29uc3RydWN0b3IpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29iaiBtdXN0IGJlIGFycmF5IG9mIHBsYWluIG9iamVjdHMnKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAob2JqLmNvbnN0cnVjdG9yICE9PSBQbGFpbk9iamVjdENvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29iaiBtdXN0IGJlIGFuIHBsYWluIG9iamVjdCcpXG4gICAgfVxuICB9XG5cbiAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBkZWVwOiB0cnVlLCBleGNsdWRlOiBbXSwgcGFyc2luZ09wdGlvbnM6IHt9IH0sIG9wdGlvbnMpXG5cbiAgcmV0dXJuIG1hcChvYmosIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIHJldHVybiBbXG4gICAgICBtYXRjaGVzKG9wdGlvbnMuZXhjbHVkZSwga2V5KSA/IGtleSA6IHNuYWtlQ2FzZShrZXksIG9wdGlvbnMucGFyc2luZ09wdGlvbnMpLFxuICAgICAgdmFsLFxuICAgICAgbWFwcGVyT3B0aW9ucyhrZXksIHZhbCwgb3B0aW9ucylcbiAgICBdXG4gIH0sIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHBhdHRlcm5zLCB2YWx1ZSkge1xuICByZXR1cm4gcGF0dGVybnMuc29tZShmdW5jdGlvbiAocGF0dGVybikge1xuICAgIHJldHVybiB0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZydcbiAgICAgID8gcGF0dGVybiA9PT0gdmFsdWVcbiAgICAgIDogcGF0dGVybi50ZXN0KHZhbHVlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBtYXBwZXJPcHRpb25zIChrZXksIHZhbCwgb3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5zaG91bGRSZWN1cnNlXG4gICAgPyB7IHNob3VsZFJlY3Vyc2U6IG9wdGlvbnMuc2hvdWxkUmVjdXJzZShrZXksIHZhbCkgfVxuICAgIDogdW5kZWZpbmVkXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/snakecase-keys/index.js\n");

/***/ })

};
;
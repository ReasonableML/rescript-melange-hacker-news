// Generated by Melange
'use strict';

var ReactDom = require("react-dom");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function createRootWithId(id) {
  var element = document.getElementById(id);
  if (!(element == null)) {
    return Caml_option.some(ReactDom.unstable_createRoot(element));
  }
  
}

function createBlockingRootWithId(id) {
  var element = document.getElementById(id);
  if (!(element == null)) {
    return Caml_option.some(ReactDom.unstable_createBlockingRoot(element));
  }
  
}

exports.createRootWithId = createRootWithId;
exports.createBlockingRootWithId = createBlockingRootWithId;
/* react-dom Not a pure module */

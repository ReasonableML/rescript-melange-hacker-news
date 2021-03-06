// Generated by Melange
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("./Utils.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_MapInt = require("bs-platform/lib/js/belt_MapInt.js");
var Belt_SetInt = require("bs-platform/lib/js/belt_SetInt.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

require("src/CommentList.css");

var disclosure = require("src/disclosure.png");

var disclosure90 = require("src/disclosure90.png");

var initialState = {
  collapsed_comments: undefined
};

function toggleComment(collapsed, idMaybe) {
  if (idMaybe === undefined) {
    return collapsed;
  }
  var id = Caml_format.caml_int_of_string(idMaybe);
  if (Belt_SetInt.has(collapsed, id)) {
    return Belt_SetInt.remove(collapsed, id);
  } else {
    return Belt_SetInt.add(collapsed, id);
  }
}

function CommentList(Props) {
  var story = Props.story;
  var match = React.useReducer((function (state, action) {
          return {
                  collapsed_comments: toggleComment(state.collapsed_comments, action._0)
                };
        }), initialState);
  var dispatch = match[1];
  var state = match[0];
  var getCommentIdFromEvent = function ($$event) {
    return Caml_option.nullable_to_opt($$event.currentTarget.getAttribute("name"));
  };
  var renderCommentText = function (textMaybe) {
    if (textMaybe !== undefined) {
      return React.createElement("div", {
                  dangerouslySetInnerHTML: Utils.dangerousHtml(textMaybe)
                });
    } else {
      return "missing comment";
    }
  };
  var renderCommentList = function (commentIds) {
    if (commentIds === undefined) {
      return React.createElement("div", undefined);
    }
    var commentList = Belt_Array.map(commentIds, (function (id) {
            var commentMaybe = Belt_MapInt.get(story.comments, id);
            var tmp;
            if (commentMaybe !== undefined) {
              if (commentMaybe.TAG === /* CommentPresent */0) {
                var comment = commentMaybe._0;
                var openComment = !Belt_SetInt.has(state.collapsed_comments, comment.id);
                var time = Utils.fromNow(comment.time);
                var by = comment.by;
                tmp = React.createElement("div", {
                      className: "CommentList_comment"
                    }, React.createElement("div", {
                          className: "CommentList_disclosureRow CommentList_inline",
                          name: String(comment.id),
                          onClick: (function ($$event) {
                              return Curry._1(dispatch, /* Toggle */{
                                          _0: getCommentIdFromEvent($$event)
                                        });
                            })
                        }, React.createElement("img", {
                              className: "CommentList_disclosure CommentList_muted",
                              alt: openComment ? "hide" : "show",
                              src: openComment ? disclosure90 : disclosure
                            }), React.createElement("span", {
                              className: "CommentList_muted"
                            }, " " + time + " by " + by)), openComment ? React.createElement("div", {
                            className: "CommentList_commentBody"
                          }, renderCommentText(comment.text), renderCommentList(comment.kids)) : React.createElement("noscript", undefined));
              } else {
                tmp = React.createElement("div", {
                      className: "CommentList_error"
                    }, "[comment deleted (id=" + (String(id) + ")]"));
              }
            } else {
              tmp = React.createElement("div", {
                    className: "CommentList_error"
                  }, "[comment not loaded (id=" + (String(id) + ")]"));
            }
            return React.createElement("div", {
                        key: String(id)
                      }, tmp);
          }));
    return React.createElement("div", undefined, commentList);
  };
  return renderCommentList(story.kids);
}

var make = CommentList;

exports.disclosure = disclosure;
exports.disclosure90 = disclosure90;
exports.initialState = initialState;
exports.toggleComment = toggleComment;
exports.make = make;
/*  Not a pure module */

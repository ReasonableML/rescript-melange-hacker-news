// Generated by Melange
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_MapInt = require("bs-platform/lib/js/belt_MapInt.js");
var Json_decode = require("@glennsl/bs-json/./src/Json_decode.js");

var apiBaseUrl = "https://serverless-api.hackernewsmobile.com";

function topStoriesUrl(page) {
  return "" + apiBaseUrl + "/topstories-25-" + page + ".json";
}

function storyUrl(id) {
  return "" + apiBaseUrl + "/stories/" + id + ".json";
}

function idsArray(json) {
  return Json_decode.array(Json_decode.$$int, json);
}

function getCommentId(comment) {
  if (comment.TAG === /* CommentPresent */0) {
    return comment._0.id;
  } else {
    return comment._0.id;
  }
}

function comment(json) {
  var deletedMaybe = Json_decode.optional((function (param) {
          return Json_decode.field("deleted", Json_decode.bool, param);
        }), json);
  var deleted = deletedMaybe !== undefined ? deletedMaybe === true : false;
  if (deleted) {
    return {
            TAG: /* CommentDeleted */1,
            _0: {
              id: Json_decode.field("id", Json_decode.$$int, json)
            }
          };
  } else {
    return {
            TAG: /* CommentPresent */0,
            _0: {
              by: Json_decode.field("by", Json_decode.string, json),
              id: Json_decode.field("id", Json_decode.$$int, json),
              kids: Json_decode.optional((function (param) {
                      return Json_decode.field("kids", idsArray, param);
                    }), json),
              parent: Json_decode.field("parent", Json_decode.$$int, json),
              text: Json_decode.optional((function (param) {
                      return Json_decode.field("text", Json_decode.string, param);
                    }), json),
              time: Json_decode.field("time", Json_decode.$$int, json)
            }
          };
  }
}

function commentsArray(json) {
  return Belt_MapInt.fromArray(Belt_Array.map(Json_decode.array(comment, json), (function (comment) {
                    return [
                            getCommentId(comment),
                            comment
                          ];
                  })));
}

function storyWithComments(json) {
  return {
          by: Json_decode.field("by", Json_decode.string, json),
          descendants: Json_decode.field("descendants", Json_decode.$$int, json),
          id: Json_decode.field("id", Json_decode.$$int, json),
          kids: Json_decode.optional((function (param) {
                  return Json_decode.field("kids", idsArray, param);
                }), json),
          score: Json_decode.field("score", Json_decode.$$int, json),
          time: Json_decode.field("time", Json_decode.$$int, json),
          title: Json_decode.field("title", Json_decode.string, json),
          url: Json_decode.optional((function (param) {
                  return Json_decode.field("url", Json_decode.string, param);
                }), json),
          descendentIds: Json_decode.field("descendentIds", idsArray, json),
          comments: Json_decode.field("comments", commentsArray, json)
        };
}

function story(json) {
  return {
          by: Json_decode.field("by", Json_decode.string, json),
          descendants: Json_decode.field("descendants", Json_decode.$$int, json),
          id: Json_decode.field("id", Json_decode.$$int, json),
          score: Json_decode.field("score", Json_decode.$$int, json),
          time: Json_decode.field("time", Json_decode.$$int, json),
          title: Json_decode.field("title", Json_decode.string, json),
          url: Json_decode.optional((function (param) {
                  return Json_decode.field("url", Json_decode.string, param);
                }), json)
        };
}

function stories(json) {
  return Json_decode.array(story, json);
}

var Decode = {
  idsArray: idsArray,
  getCommentId: getCommentId,
  comment: comment,
  commentsArray: commentsArray,
  storyWithComments: storyWithComments,
  story: story,
  stories: stories
};

function fetchTopStories(page, callback) {
  fetch(topStoriesUrl(page)).then(function (prim) {
          return prim.json();
        }).then(function (json) {
        var stories = Json_decode.array(story, json);
        Curry._1(callback, [
              page,
              stories
            ]);
        return Promise.resolve(undefined);
      });
  
}

function fetchStoryWithComments(id, callback) {
  fetch(storyUrl(id)).then(function (prim) {
          return prim.json();
        }).then(function (json) {
        var stories = storyWithComments(json);
        Curry._1(callback, stories);
        return Promise.resolve(undefined);
      });
  
}

exports.apiBaseUrl = apiBaseUrl;
exports.topStoriesUrl = topStoriesUrl;
exports.storyUrl = storyUrl;
exports.Decode = Decode;
exports.fetchTopStories = fetchTopStories;
exports.fetchStoryWithComments = fetchStoryWithComments;
/* No side effect */
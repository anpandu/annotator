/**
* ExploreController
*
* @description :: Server-side logic for managing explores
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var Promise = require('bluebird');

module.exports = {

  getContent: function (req, res) {
    var cs = ControllerService.build(res);
    var params = req.allParams();

    Promise
      .resolve()
      .then(function () {
        return Content
          .find({})
          .limit(10)
      })
      .then(function (contents) {
        return contents
          .map(function (c) {
            return c.getContentRowForm();
          })
      })
      .then(function (contents) {
        // cs.respondSuccess(contents);
        return res.view('explore/explore', {
          contents: contents
        });
      });

  }

};


/**
* ExploreController
*
* @description :: Server-side logic for managing explores
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var Promise = require('bluebird');

module.exports = {

  getContent: function (req, res) {
    var cs = ControllerService.build(req, res);
    var params = req.allParams();
    var page = +params['page']-1;
    var itemsPerPage = 10;

    Promise
      .resolve()
      .then(function () {
        return Content
          .find({})
          .limit(itemsPerPage)
          .skip(page*itemsPerPage)
      })
      .then(function (contents) {
        return contents
          .map(function (c) {
            return c.getContentRowForm();
          })
      })
      .then(function (contents) {
        cs.view('explore/explore', {contents: contents});
      });

  }

};


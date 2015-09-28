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
    var page = _.isUndefined(params['page']) ? 0 : +params['page']-1;
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
        var p1 = contents
          .map(function (c) {
            return c.getContentRowForm();
          })
        var p2 = Content
          .count({})
          .then(function (n) {
            return Math.ceil(n/itemsPerPage);
          })
        return Promise.all([p1, p2]);
      })
      .then(function (proms) {
        var contents = proms[0];
        var total_pages = proms[1];
        cs.view('explore/explore', {
          contents: contents,
          total_pages: total_pages,
          page: page+1
        });
      });

  }

};


/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  getContent: function (req, res) {
    var cs = ControllerService.build(res);
    Content
      .findOne(req.param('content_id'))
      .then(function (result) {
        if (_.isUndefined(result))
          cs.respondNotFound('content not found');
        cs.respondSuccess(result);
      })
  }

};


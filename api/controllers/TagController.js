/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird')

module.exports = {
  
  getContent: function (req, res) {
    var cs = ControllerService.build(res);
    Content
      .findOne(req.param('content_id'))
      .then(function (result) {
        if (_.isUndefined(result))
          cs.respondNotFound('content not found');
        else
          return res.view('tag/tagger', {
            content: result
          });
      })
  },
  
  storeAnnotation: function (req, res) {
    var cs = ControllerService.build(res);
    var params = req.allParams();
    var content_id = params['content_id'];
    var user_id = req.user.id;
    delete params['content_id'];

    Promise
      .resolve()
      .then(function () {
        return Content.findOne({id: content_id})
      })
      .then(function (content) {
        return Annotation
          .findOrCreate({ 
              text: content.text,
              user: user_id
            },
            {
              text: content.text,
              value: params,
              user: user_id
          })
      })
      .then(function (annotation) {
        return Annotation
          .update({id: annotation.id}, {value: params})
      })
      .then(function (annotation) {
        cs.respondSuccess(annotation);
      })
  }

};


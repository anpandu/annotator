/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird')

module.exports = {
  
  getContent: function (req, res) {
    var cs = ControllerService.build(req, res);
    var _tags = [
      {title: 'organization', content:''},
      {title: 'place', content:''},
      {title: 'time', content:''}
    ];

    Promise
      .resolve()
      .then(function () {
        return Content.findOne(req.param('content_id'))
      })
      .then(function (content) {
        if (_.isUndefined(content))
          return Promise.reject('content not found');
        else {
          var p = Annotation.findOne({content: content.id});
          return Promise.all([content, p]);
        }
      })
      .then(function (result) {
        var content = result[0];
        var annotation = result[1];
        var tags = [];
        if (_.isUndefined(annotation))
          tags =  _tags;
        else {
          var keys = _.keys(annotation.value);
          var values = _.values(annotation.value);
          for (var i = 0; i < keys.length; i++)
            tags.push({'title': keys[i], 'content': values[i]})
        }
        cs.view('tag/tagger', {
          content: content,
          tags: tags
        });
      })
      .catch(function (arg) { 
        cs.redirect('/explore/1');
      })
  },
  
  storeAnnotation: function (req, res) {
    var cs = ControllerService.build(req, res);
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
              content: content_id,
              user: user_id
            },
            {
              text: content.text,
              value: params,
              user: user_id,
              content: content_id
          })
      })
      .then(function (annotation) {
        return Annotation
          .update({id: annotation.id}, {value: params})
      })
      .then(function (annotation) {
        return Content
          .update({id: content_id}, {annotation: annotation.id})
          .then(function () {
            var next = +content_id + 1;
            cs.redirect('/tag/'+next);
          })
      })
  }

};


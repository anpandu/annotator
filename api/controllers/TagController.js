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
    var _tags = sails.config.tag.default_tags;

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
          var temp_tags = annotation.getTags();
          var keys = _.map(temp_tags, function (tt) { return tt[0]; });
          var values = _.map(temp_tags, function (tt) { return tt[1]; });
          for (var i = 0; i < keys.length; i++)
            tags.push({'title': keys[i], 'content': values[i]})
          for (var i = 0; i < _tags.length; i++)
            if (!_.include(keys, _tags[i].title))
              tags.push(_tags[i]);
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

    var labels = Annotation.convertFormDataToLabel(params);

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
              value: labels,
              user: user_id,
              content: content_id
          })
      })
      .then(function (annotation) {
        return Annotation
          .update({id: annotation.id}, {value: labels})
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


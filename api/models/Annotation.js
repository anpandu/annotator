/**
* Annotation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    text: {type: 'string'},
    value: {type: 'json'},
    user : { model: 'user' },
    content : { model: 'content' },

    getTags: function () {
        var result = this.value;
        result = _.map(result, function (val, key) {
            if (!_.isArray(val)) {
                var obj = {};
                obj[key] = val;
                return obj;
            } else {
                var arr = [];
                for (var i = 0; i < val.length; i++) {
                    var obj = {};
                    obj[key] = val[i];
                    arr.push(obj);  
                };
                return arr;
            }
        });
        result = _.flatten(result, false);
        result = _.map(result, function (val) { return [_.keys(val)[0], _.values(val)[0]]; });
        return result;
    }

  },

  convertFormDataToLabel: function (formData) {
    var result = [];
    for (label in formData) {
      var item = {
        label: label,
        words: formData[label]
      };
      result.push(item);
    }
    return result;
  }
  
};
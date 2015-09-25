/**
* Content.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    title: {type: 'string'},
    text: {type: 'string'},

    getContentRowForm: function () {
      var _this = this.toJSON();
      var result = {
      	title: _this.title
      };
      return result;
    }

  }
  
};


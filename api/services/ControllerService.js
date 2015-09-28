/**
* ControllerService.js
*
* @description :: Stream Service includes stream-related functions.
*/

var ControllerService = function (_res) {
  this.res = _res;
};

ControllerService.prototype.notFoundStatus = 404;
ControllerService.prototype.okStatus = 200;

ControllerService.prototype.respondNotFound = function(message) {
  var err_msg = {
    err_msg: message,
    status: ControllerService.prototype.notFoundStatus.toString()
  };
  return this.res.json(ControllerService.prototype.notFoundStatus, err_msg);
};

ControllerService.prototype.respondSuccess = function(obj){
  return this.res.json(ControllerService.prototype.okStatus, obj);
};

ControllerService.prototype.redirect = function(url){
  return this.res.redirect(url);
};

ControllerService.prototype.build = function (res) {
  return new ControllerService(res);
}

module.exports = new ControllerService ();
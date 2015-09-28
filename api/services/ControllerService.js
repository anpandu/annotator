/**
* ControllerService.js
*
* @description :: Stream Service includes stream-related functions.
*/

var ControllerService = function (_req, _res) {
  this.req = _req;
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

ControllerService.prototype.view = function(path, data){
  var isMocked = !_.isUndefined(this.req.param('mock'));
  if (isMocked)
    return this.respondSuccess(data);
  else
    return this.res.view(path, data);
};

ControllerService.prototype.build = function (req, res) {
  return new ControllerService(req, res);
}

module.exports = new ControllerService ();
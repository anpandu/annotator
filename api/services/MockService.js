/**
* MockService.js
*
* @description :: Mock Service generate model items.
*/

var MockService = function (_res) {
  this.res = _res;
};

MockService.prototype.createContents = function(n, data) {
	var params = _.clone(data, true);
	params.title += n;
	return Content
		.create(params)
		.then(function (content) {
			n = n-1;
			if (n>0)
				return MockService.prototype.createContents(n, data)
			return content;
		})
};

module.exports = new MockService ();
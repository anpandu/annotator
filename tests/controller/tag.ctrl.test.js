describe('TagController', function() {

  var endpoint = '/tag';

  describe('/:id', function() {

    it('should return content', function (done) {
      Promise.resolve()
        .then(function () { return Content.create({ title:'test_tag_ctrl_1.1', text:'test_tag_ctrl_1.1' }); })
        .then(function (content) {
          _content = content;
          request(sails.hooks.http.app)
            .get(endpoint+"/"+_content.id)
            .expect(function(res) {
              var result = res.body;
              assert('title' in result, 'title field doesn\'t exist' );
              assert('text' in result, 'text field doesn\'t exist' );
              assert(result.id == _content.id, 'wrong content' );
            })
            .end(done);
        });
    });

    it('should return 404 when content not found', function (done) {
      Promise.resolve()
        .then(function () {
          request(sails.hooks.http.app)
            .get(endpoint+"/fakeid")
            .expect(function(res) {
              var result = res.body;
              assert(_.isPlainObject(result), 'result is not object');
              assert('err_msg' in result, 'err_msg field doesn\'t exist' );
              assert('status' in result, 'status field doesn\'t exist' );
              assert(result.status === '404', 'error status is not 404');
            })
            .end(done);
        });
    });

  });

});
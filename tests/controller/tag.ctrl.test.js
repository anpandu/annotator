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
            .expect(200)
            .expect(function(res) {
              // var result = res.body;
              // console.log(res.text);
              // assert('title' in result, 'title field doesn\'t exist' );
              // assert('text' in result, 'text field doesn\'t exist' );
              // assert(result.id == _content.id, 'wrong content' );
            })
            .end(done);
        });
    });

    it('should return 404 when content not found', function (done) {
      Promise.resolve()
        .then(function () {
          request(sails.hooks.http.app)
            .get(endpoint+"/fakeid")
            .expect(404)
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

    it('should return content with tags', function (done) {
      Promise.resolve()
        .then(function () { 
          var p1 = Content.create({ title:'test_tag_ctrl_1.3', text:'test_tag_ctrl_1.3' });
          var p2 = User.create({ email:'test_tag_ctrl_1.3@email.com', password:'test_tag_ctrl_1.3' });
          return Promise.all([p1,p2]);
        })
        .then(function (result) {
          _content = result[0];
          _user = result[1];
          return Annotation.create({
            text: _content.text,
            value: {hai:'haihai', hoi:'hoihoi', hii:'hiihii', },
            user: _user.id,
            content: _content.id 
          })
        })
        .then(function (annotation) {
          request(sails.hooks.http.app)
            .get(endpoint+"/"+_content.id)
            .expect(200)
            .expect(function(res) {
              // var result = res.body;
              // console.log(res.text);
            })
            .end(done);
        });
    });

  });

});
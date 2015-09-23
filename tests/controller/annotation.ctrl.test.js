describe('AnnotationController', function() {

  var endpoint = '/annotation';

  describe('/post', function() {

    it('should created new', function (done) {

      var _user;

      Promise.resolve()
        .then(function () { return User.create({ email: 'test_annotation_ctrl_1.1@email.com', password:'test_annotation_ctrl_1.1' }) })
        .then(function (user) {
          _user = user;
          request(sails.hooks.http.app)
            .post(endpoint)
            .set('Content-Type', 'application/json')
            .send({
              text:'test_annotation_ctrl_1.1',
              value: {someValue:'test_annotation_ctrl_1.1'},
              user: user.id
            })
            .expect(function(res) {
              var annotation = res.body;
              assert('text' in annotation, 'text field doesn\'t exist' );
              assert('value' in annotation, 'value field doesn\'t exist' );
              assert(_.isPlainObject(annotation.value), 'value is not object' );
              assert('user' in annotation, 'user field doesn\'t exist' );
              assert(annotation.user == _user.id, 'wrong user' );
            })
            .end(done);
        })
    });

  });

});
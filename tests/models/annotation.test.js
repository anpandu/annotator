describe('AnnotationModel', function() {

  describe('#create', function() {

    it('should has default original field', function (done) {
      Annotation
        .create({ text:'test_annotation_1.1', value: {someValue:'test_annotation_1.1'} })
        .then(function (annotation) {
          assert('text' in annotation, 'text field doesn\'t exist' );
          assert('value' in annotation, 'value field doesn\'t exist' );
          assert(_.isPlainObject(annotation.value), 'value is not object' );
          done();
        })
        .catch(done);
    });

    it('should has user', function (done) {
      var _email = 'test_annotation_1.2@email.com';
      User
        .create({ email: _email, password:'test_annotation_1.2' })
        .then(function (user) { return Annotation .create({ text:'test_annotation', value: {someValue:'test_annotation_1.1'}, user: user.id }); })
        .then(function (annotation) {
          assert('user' in annotation, 'user field doesn\'t exist' );
          return User.findOne({id: annotation.user})
        })
        .then(function (user) {
          assert(!_.isUndefined(user), 'user not found');
          assert(user.email == _email, 'wrong email' );
          done();
        })
        .catch(done);
    });

  });


});
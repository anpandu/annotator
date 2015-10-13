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
        .then(function (user) { return Annotation .create({ text:'test_annotation', value: {someValue:'test_annotation_1.3'}, user: user.id }); })
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

    it('should has content', function (done) {
      var _text = 'test_annotation_1.3';
      Content
        .create({ text: _text })
        .then(function (content) { return Annotation .create({ text:'test_annotation', value: {someValue:'test_annotation_1.3'}, content: content.id }); })
        .then(function (annotation) {
          assert('content' in annotation, 'content field doesn\'t exist' );
          return Content.findOne({id: annotation.content})
        })
        .then(function (content) {
          assert(!_.isUndefined(content), 'content not found');
          assert(content.text == _text, 'wrong text' );
          done();
        })
        .catch(done);
    });

  });

  describe('#getTags', function() {

    it('should return singular tags', function (done) {
      Annotation
        .create({ text:'test_annotation_1.2', value: {someValue:'test_annotation_1.2', someValueB: ['test_annotation_1.2b', 'test_annotation_1.2c']} })
        .then(function (annotation) {
          assert('text' in annotation, 'text field doesn\'t exist' );
          assert('value' in annotation, 'value field doesn\'t exist' );
          assert(_.isPlainObject(annotation.value), 'value is not object' );
          return annotation.getTags();
        })
        .then(function (tags) {
          assert(_.isArray(tags), 'tags is not array' );
          assert(tags.length == 3, 'wrong number of tags' );
          done();
        })
        .catch(done);
    });

  });

  describe('#convertFormDataToLabel', function() {

    it('should return singular tags', function (done) {
      var formData = {
        label1: ['test_annotation_3.1'],
        label2: ['test_annotation_3.2', 'test_annotation_3.3']
      }
      var ans = [
        { label : 'food', words : ['test_annotation_3'] },
        { label : 'food', words : ['test_annotation_3.2', 'test_annotation_3.3'] }
      ]
      var labels = Annotation.convertFormDataToLabel(formData);
      assert(_.isArray(labels), 'labels is not array' );
      labels.forEach(function (label) {
        assert('label' in label, 'label field doesn\'t exist' );
        assert('words' in label, 'words field doesn\'t exist' );
      });
      done();
    });

  });

});
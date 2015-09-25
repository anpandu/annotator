describe('ContentModel', function() {

  describe('#create', function() {

    it('should has default original field', function (done) {
      Content
        .create({ title:'test_content_1.1', text:'test_content_1.1' })
        .then(function (res) {
          assert('title' in res, 'title field doesn\'t exist' );
          assert('text' in res, 'text field doesn\'t exist' );
          done();
        })
        .catch(done);
    });

  });

  describe('#getContentRowForm()', function() {

    it('should has default original field', function (done) {
      Content
        .create({ title:'test_content_2.1', text:'test_content_2.1' })
        .then(function (res) {
          return res.getContentRowForm();
        })
        .then(function (res) {
          assert('title' in res, 'title field doesn\'t exist' );
          done();
        })
        .catch(done);
    });

  });


});
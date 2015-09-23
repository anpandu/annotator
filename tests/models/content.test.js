describe('ContentModel', function() {

  describe('#create', function() {

    it('should has default original field', function (done) {
      Content
        .create({ title:'test_content', text:'test_content' })
        .then(function (res) {
          assert('title' in res, 'title field doesn\'t exist' );
          assert('text' in res, 'text field doesn\'t exist' );
          done();
        })
        .catch(done);
    });

  });


});
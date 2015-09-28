describe('ExploreController', function() {

  var endpoint = '/explore';

  describe('/:page', function() {

    it('should return content', function (done) {
      Promise.resolve()
        .then(function () { return MockService.createContents(13, { title:'test_explore_ctrl_1.1.', text:'test_explore_ctrl_1.1' }); })
        .then(function () {
          return request(sails.hooks.http.app)
            .get(endpoint+"?mock")
            .expect(200)
            .expect(function(res) {
              var result = res.body;
              assert('contents' in result, 'contents not found');
              assert(_.isArray(result.contents), 'contents is not array');
              assert(result.contents.length == 10, 'wrong number of contents');
            });
        })
        .then(function () {
          return request(sails.hooks.http.app)
            .get(endpoint+"/1?mock")
            .expect(200)
            .expect(function(res) {
              var result = res.body;
              assert('contents' in result, 'contents not found');
              assert(_.isArray(result.contents), 'contents is not array');
              assert(result.contents.length == 10, 'wrong number of contents');
            });
        })
        .then(function () {
          request(sails.hooks.http.app)
            .get(endpoint+"/2?mock")
            .expect(200)
            .expect(function(res) {
              var result = res.body;
              assert('contents' in result, 'contents not found');
              assert(_.isArray(result.contents), 'contents is not array');
              assert(result.contents.length == 3, 'wrong number of contents');
            })
            .end(done);
        });
    });

  });

});
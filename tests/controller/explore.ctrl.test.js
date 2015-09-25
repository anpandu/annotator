describe('ExploreController', function() {

  var endpoint = '/explore';

  describe('/:page', function() {

    it('should return content', function (done) {
      Promise.resolve()
        .then(function () { return Content.create({ title:'test_explore_ctrl_1.1.1', text:'test_explore_ctrl_1.1.1' }); })
        .then(function () { return Content.create({ title:'test_explore_ctrl_1.1.2', text:'test_explore_ctrl_1.1.2' }); })
        .then(function () { return Content.create({ title:'test_explore_ctrl_1.1.3', text:'test_explore_ctrl_1.1.3' }); })
        .then(function () { return Content.create({ title:'test_explore_ctrl_1.1.4', text:'test_explore_ctrl_1.1.4' }); })
        .then(function () { return Content.create({ title:'test_explore_ctrl_1.1.5', text:'test_explore_ctrl_1.1.5' }); })
        .then(function () {
          request(sails.hooks.http.app)
            .get(endpoint+"/1")
            .expect(200)
            .expect(function(res) {
              // var result = res.body;
              // console.log(result);
            })
            .end(done);
        });
    });

  });

});
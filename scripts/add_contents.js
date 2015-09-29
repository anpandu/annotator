var Sails = require('sails')


var addContents = function (contents) {
  if (contents.length>0) {
    content = contents.pop()
    delete content.id
    delete content.created_at
    delete content.updated_at
    return Content
      .create(content)
      .then(function (c) {
        console.log(c.title)
        addContents(contents)
      })
  }
  else
    return Promise.resolve()
}

Sails.lift({
  environment: 'test',
  port: 1337,
  models: {
    connection: 'annotation',
    migrate: 'safe'
  }
}, function(err, server) {
  sails = server
  if (err) 
    return console.log(err)

  Promise.resolve()
    .then(function () {
      return Content.find({})
    })
    .then(function (contents) {
      addContents(contents)
    })

})
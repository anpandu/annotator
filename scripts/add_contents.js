var Sails = require('sails')
var fs = require('fs')

var addContents = function (contents) {
  if (contents.length>0) {
    content = contents.pop()
    delete content.id
    delete content.created_at
    delete content.updated_at
    return Content
      .create(content)
      .then(function (c) {
        console.log('['+contents.length+'] '+c.title)
        return addContents(contents)
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
      var filename = process.argv[2]
      console.log(filename)
      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) console.log(err)
        return Promise
          .resolve(data)
          .then(function (result) {
            var contents = JSON.parse(result)
            return addContents(contents)
          })
          .then(function () {
            console.log('=== FINISH ===')
            Sails.lower()
          })
      })
    })

})
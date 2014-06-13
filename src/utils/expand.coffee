validator = require "validator"
expandShorthand = require "./expandShorthand"
Promise = require "bluebird"
jsonld = require "jsonld"
jsonld = jsonld.promises()
_ = require "lodash"

parseExpandedObj = (obj, key, callback) ->
  newObj = {}
  newObj[key] = obj[key][0]['@value']
  callback null, newObj
  return

parseExpandedObj = Promise.promisify parseExpandedObj

expand = (doc, context, callback) ->

  doc['@context'] = context
  jsonld.expand(doc)
    .then((arr) -> 
      console.log 'arr', arr
      obj = arr[0]
      keys = Object.keys(obj)
      Promise.map(keys, (key) -> 

        parseExpandedObj(obj, key)
        )
      .nodeify(callback))



module.exports = Promise.promisify expand







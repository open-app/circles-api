// Generated by CoffeeScript 1.7.1
(function() {
  var app, bestGroup, config, context, db, expect, graphdb, group, request, urlencode, utils;

  request = require("supertest");

  expect = require("chai").expect;

  urlencode = require("urlencode");

  require('longjohn');

  context = require('../lib/context');

  config = require('../lib/config');

  utils = require('../lib/utils/');

  app = void 0;

  db = void 0;

  graphdb = void 0;

  group = {
    id: "http://circles.app.enspiral.com/loomiocommunity",
    name: "Loomio Community",
    based_near: "http://www.geonames.org/2179537/wellington.html",
    'http://open.app/relations/members': [
      {
        "@id": "http://open.app/people/aaronthornton"
      }, {
        "@id": "http://open.app/people/simontegg"
      }
    ]
  };

  bestGroup = {
    id: "http://circles.app.enspiral.com/bestgroup",
    name: "Best Group",
    based_near: "http://www.geonames.org/2179537/wellington.html",
    members: [
      {
        "@id": "http://open.app/people/simontegg"
      }
    ]
  };

  describe("#circles", function() {
    before(function() {
      db = require("level-test")()("testdb");
      graphdb = require('levelgraph-jsonld')(require('levelgraph')(db));
      app = require('../')(db);
      request = request(app);
    });
    it("should POST /circles", function(done) {
      return request.post("/circles").send(group).expect("Content-Type", /json/).expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        return graphdb.jsonld.get(group['@id'], context, function(err, body) {
          var prop;
          if (err) {
            return done(err);
          }
          for (prop in body) {
            expect(body).to.have.property(prop, group[prop]);
          }
          return done();
        });
      });
    });
    it("should GET /circles?members=http%3A%2F%2Fopen.app%2Fpeople%2Fsimontegg&based_near=http://www.geonames.org/2179537/wellington.html", function(done) {
      var data;
      data = utils.normalizeData(config, group);
      return graphdb.jsonld.put(data, function(err) {
        expect(err).to.not.exist;
        console.log('putted group', data);
        return request.get("/circles?members=" + urlencode(group['http://open.app/relations/members'][1]["@id"]) + "&based_near=" + urlencode(group.based_near)).expect("Content-Type", /json/).expect(200).expect(function(req) {
          var body, prop;
          body = req.body;
          expect(body).to.have.length(1);
          for (prop in body[0]) {
            expect(body[0]).to.have.property(prop, group[prop]);
          }
        }).end(function(err, res) {
          if (err) {
            return done(err);
          }
          return done();
        });
      });
    });
    return this;
  });

}).call(this);

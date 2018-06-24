const assert = require('assert');
const dryg = require('../dryg');

describe('dryg', function() {
  describe('fetchDay()', function() {
    it('should fetch 2018-01-01 successfully', function(done) {
      let expected = {
        weekday: 'Måndag',
        week: 1,
        holiday: 'Nyårsdagen',
        nameDays: []
      };

      dryg.fetchDay(new Date('2018-01-01'))
        .then(function(day) {
          return done(assert.deepStrictEqual(expected, day));
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});

const assert = require('assert');
const gm = require('../goodmorning');

const cases = [
  {
    weekday: 'Tuesday',
    week: 25,
    holiday: 'Midsummer Eve',
    nameDays: ['Paulina', 'Paula']
  },
  {
    weekday: 'Wednesday',
    week: 25,
    holiday: null,
    nameDays: []
  }
];

describe('goodmorning', function() {
  describe('buildMessage()', function() {
    it('should include weekday', function() {
      for (let i = 0; i < cases.length; i++) {
        // Expect a lowercase weekday
        let weekday = cases[i].weekday.toLowerCase();
        let actual = gm.buildMessage(cases[i]);

        assert.ok(actual.indexOf(weekday) !== -1);
      }
    });

    it('should include week number', function() {
      for (let i = 0; i < cases.length; i++) {
        let actual = gm.buildMessage(cases[i]);

        assert.ok(actual.indexOf(cases[i].week) !== -1);
      }
    });

    it('should include holiday if applicable', function() {
      for (let i = 0; i < cases.length; i++) {
        let actual = gm.buildMessage(cases[i]);

        if (cases[i].holiday !== null) {
          assert.ok(actual.indexOf(cases[i].holiday) !== -1);
        }
      }
    });

    it('should exclude holiday if not applicable', function() {
      for (let i = 0; i < cases.length; i++) {
        let actual = gm.buildMessage(cases[i]);

        if (cases[i].holiday === null) {
          assert.ok(actual.indexOf(cases[i].holiday) === -1)
        }
      }
    });

    it('should include name days', function() {
      for (let i = 0; i < cases.length; i++) {
        let names = cases[i].nameDays;
        let actual = gm.buildMessage(cases[i]);

        for (let y = 0; y < names.length; y++) {
          assert.ok(actual.indexOf(names[y]) !== -1);
        }
      }
    });

    it('should not mention "namnsdag" with no name days', function() {
      for (let i = 0; i < cases.length; i++) {
        let day = {
          weekday: 'Tuesday',
          week: 25,
          holiday: 'Midsummer Eve',
          nameDays: []
        }

        let actual = gm.buildMessage(day);

        assert.ok(actual.indexOf('namnsdag') === -1);
      }
    });
  });

  describe('collapseNames()', function() {
    it('should handle empty name array', function() {
      assert.equal('', gm.collapseNames([]));
    });

    it('should use "and" properly', function() {
      assert.equal('Anders och Annika', gm.collapseNames(['Anders', 'Annika']));
    });

    it('should use comma properly', function() {
      assert.equal(
        'Anders, Annika och Albin',
        gm.collapseNames(['Anders', 'Annika', 'Albin']));
    });
  });
});

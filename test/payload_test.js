'use strict';

var grunt = require('grunt'),
  fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.payload = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  single_dest: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/dist.js');
    var expected = grunt.file.read('test/expected/dist.js');
    test.equal(actual, expected, 'should concat file list into one.');

    test.done();
  },
  multi_dest: function(test) {
    test.expect(1);

    var actual = fs.readdirSync('tmp/mock').concat(fs.readdirSync('tmp/mock/folder')).join('');
    var expected = fs.readdirSync('test/expected/mock').concat(fs.readdirSync('test/expected/mock/folder')).join('');
    test.equal(actual, expected, 'should handle expanded file pattern.');

    test.done();
  },

};

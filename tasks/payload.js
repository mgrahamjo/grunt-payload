/*
 * grunt-payload
 * https://github.com/mgrahamjo/grunt-payload
 *
 * Copyright (c) 2015 Mike Johnson
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

    function annotate(src, options) {

        var regex = /payload\(\s*?function\((.*?)\)/g,
            output = {},
            match,
            q = options.singlequotes ? "'" : '"';

        while (match = regex.exec(src)) {

            match = match[1];

            try {
                var stringList = match.split(',').map(function(dep) {
                    return q + dep.trim() + q;
                }).join(',');

                src = src.replace(
                    'payload(function(' + match + ')',
                    'payload([' + stringList + '],function(' + match + ')'
                );
            } catch(err) {
                output.errors = output.errors || [];
                output.errors.push(err);
            }
        }

        output.src = src;

        return output;
    }

    grunt.registerMultiTask('payload', 'Make shorthand Payload module loader syntax minification-safe.',

        function () {
            var filesNum = 0,
                validRun = true,
                options = this.options({
                    singleQuotes: true,
                    separator: ''
                });

            this.files.forEach(function (mapping) {
                if (!runpayload(mapping, options)) {
                    validRun = false;
                }
            });

            function runpayload(mapping, options) {

                filesNum++;

                // seperator for file concatenation; defaults to linefeed
                var separator = (typeof options.separator === 'string') ?
                        options.separator :
                        grunt.util.linefeed;

                var concatenatedSource = mapping.src.map(function (file) {
                    return grunt.file.read(file);
                }).join(separator);

                var payloadOutput = annotate(concatenatedSource, options);

                if (payloadOutput.errors) {
                    grunt.log.write('Generating "' + mapping.dest + '" from: "' + mapping.src.join('", "') + '"...');
                    grunt.log.error();
                    payloadOutput.errors.forEach(function (error) {
                        grunt.log.error(error);
                    });
                    return false;
                }

                grunt.file.write(mapping.dest, payloadOutput.src);

                return true;
            }

            if (validRun) {
                if (filesNum < 1) {
                    grunt.log.ok('No files provided to the payload task.');
                } else {
                    grunt.log.ok(filesNum + (filesNum === 1 ? ' file' : ' files') + ' successfully generated.');
                }
            }
            return validRun;
        });
};
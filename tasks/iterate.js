/*
 * grunt-iterate
 * https://github.com/jsmantras/grunt-iterate
 *
 * Copyright (c) 2015 JSMantras
 * Licensed under the MIT license.
 */

'use strict';
var async = require('async');
var os = require('os');
var lpad = require('lpad');

var procs = [];

module.exports = function (grunt) {
	grunt.registerTask('iterate', function () {
		var opts = this.options({
				argName: 'key',
				separator: ',',
				limit: Math.max(os.cpus().length, 2)
			}),
			allOptValues = grunt.option(opts.argName).split(opts.separator),
			callback = this.async(),
			inputs = grunt.util.toArray(arguments),
			flags = grunt.option.flags(),
			arg = [ '--', opts.argName, '=', grunt.option(opts.argName)].join('');

			if (flags.indexOf(arg) >= 0) {
				flags.splice(flags.indexOf(arg), 1);
			}

		async.eachLimit(allOptValues, opts.limit, function (curOpt, next) {
			var task = [ inputs.join(':') ].concat('--' + opts.argName + '=' + curOpt),
				itTask = grunt.util.spawn({
					grunt: true,
					args: task
				}, function (err, result, code) {
					if (err || code > 0) {
						grunt.warn(lpad(result.stderr || result.stdout, '    '));
					}
					grunt.log.writeln(lpad(
						'\n' + result.stdout +
						'\nFinished running task "' + inputs.join(':') + '" with "' +
						opts.argName + '=' + curOpt + '"'
					, '   '));
					next();
				});
			procs.push(itTask);
		}, function () {
			callback();
		});
	});
};

process.on('exit', function () {
	procs.forEach(function (pro) {
		pro.kill();
	});
});

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			all: ["scripts/*.js"],
			options: {
				config: "conf/eslint.json",
				rulesDir: "conf/rules",
			},
		},
		watch: {
			scripts: {
				files: ["scripts/*.js"],
				tasks: ["uglify"],
				options: {
					spawn: false,
				},
			},
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
			},
			build: {
				files: [{
					expand: true,
					cwd: "scripts",
					src: "*.js",
					dest: "build",
					ext: ".min.js",
				}],
			},
		},
		browserify: {
			dist: {
				files: {
					"build/module.js": ["client/scripts/**/*.js", "client/scripts/**/*.coffee"]
				},
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("eslint-grunt");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-uglify");


	// Default task(s).
	grunt.registerTask("default", ["browserify", "eslint", "watch", "uglify"]);
};
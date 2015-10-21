# grunt-payload

> Make shorthand [Payload](https://github.com/mgrahamjo/payload) module loader syntax minification-safe.

Converts `payload(function(dependency) { } )` to `payload(['dependency'], function(dependency) { } )`.

Similar to ng-annotate, but for the Payload module loader instead of Angular.

If you're using arrow functions to wrap your modules, be sure to run grunt-payload *after* your transpilation step and before minification.
```
// This needs to be transpiled before running grunt-payload
payload($ => {
  $.doSomething();
});
```

## Getting Started
This plugin was built on Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-payload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-payload');
```

## The "payload" task

### Overview
In your project's Gruntfile, add a section named `payload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  payload: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `'\n'`

A string value that is added between concatenated files. Newline is a safe choice because it prevents your code from being added to a comment line.

### Usage Examples

#### Default Options
Make your Payload modules minification safe and concatenate them all into one file:

```js
grunt.initConfig({
  payload: {
    options: {},
    files: {
      'dist/minification-safe.js': ['src/app.js', 'src/folder/*.js'],
    },
  },
});
```

#### Custom Options
Make your Payload modules minification safe and write them to corresponding files in a new directory:

```js
grunt.initConfig({
  payload: {
    options: {
      separator: ':',
    },
    files: [{
      expand: true,
      src: ['src/file.js', 'src/folder/*.js'],
      dest: 'dist',
      ext: '.js'
    }]
  },
});
```


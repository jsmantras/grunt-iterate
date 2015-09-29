# grunt-iterate
> Iterate tasks multiple times for an argument list. 

Its offen required to run a task multiple times for different argument values. `grunt-iterate` makes the task run multiple times concurrently for each value in a list specified during invocation of grunt.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-iterate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-iterate');
```

## The "iterate" task

### Overview
In your project's Gruntfile, add a section named `iterate` to the data object passed into `grunt.initConfig()`.

```js
grunt.loadNpmTasks('grunt-iterator');
grunt.initConfig({
  iterate: {
    options: {
        argName: 'key'   // Default set to 'key'
        separator: ','   // Default set to ','
        limit: 5         // Since the tasks run concurrently default set to maximum of 2 or number of CPU cores
    }
  }
});
```
While registering a task use `iterate` to make it run multiple times for the list specified above as `iterate.optons.argName`
```js
grunt.registerTask('regTaskName', 'This is a task which runs taskName', ['iterate:task1']);
```
In the command line the grunt can be invoked as:
```unix
$ grunt regTaskName --key=arg1,arg2,arg3
```
If iterate is used for multiple subtasks, each will be run serially. Conisder a task registered as follows:
```js
grunt.registerTask('default', 'This is a task which runs taskName', [
    'iterate:task1',
    'iterate:task2',
    'task3'
]);
```
and invoked as:
```
$ grunt --key=arg1,arg2,arg3
```
For this case `task1` will run for `arg1`, `arg2` and `arg3` concurrently then `task2` is run concurrently following `task3`.  

### Options
#### argName
Type: `String`
Default value: `'key'`

A string value that is used to specify the argument name used during invocation.

#### separator
Type: `String`
Default value: `','`

A string value that is used to separate each values in the argument.

#### limit
Type: `Number`
Default value: `2` or Number of CPU cores

A string value that is used to specify the number of concurrent tasks that can be run. If this is set to 3, three instances of the task will run with different arguments as a list with name specified in `argName`. If arguments list has less items than the limit only that number of instancess are triggered.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

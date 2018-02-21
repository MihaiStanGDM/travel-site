//require all the packages needed

var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');


// this task will take our main css file, process it (pipe) using our different packages that we imported 
// (postcss-import, postcss-simple-vars, postcss-nested, autoprefixer) and then 
// create one single file in the temp folder that we can use it to style our website
gulp.task('styles', function() {
  // you have to use return because it is an async process
  // src - where your main css file is located (the file where you actualy code)
  return gulp.src('./app/assets/styles/styles.css')
    // pipe - how do you want to process it
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    // when you have an error in your css files, set up a function
    .on('error', function(errorInfo){
    	// print the error
    	console.log(errorInfo.toString());
    	// it tells gulp that this task has come to an end, and you can inject the new css file to the browser (it doesn't even see the error)
    	this.emit('end');
    })
    // dest - where do you want to save this new file after we process it
    .pipe(gulp.dest('./app/temp/styles'));
});
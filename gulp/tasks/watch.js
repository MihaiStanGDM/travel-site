//require all the packages needed

var gulp = require('gulp'),
watch = require('gulp-watch');
browserSync = require ('browser-sync').create();


// created a task to watch after modification of our files and do the following
gulp.task('watch', function() {

  // initialize browserSync so your browser can automatically reload when you modify something
  browserSync.init({
    // notify false tells browserSync not to display a message in the browser after every modification
    notify: false,
    // set up the main website folder (relative to this file "gulpfile.js")    
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    // every time we modify index.html file, we tell browserSync to reload
    browserSync.reload();
  });

  // every time we modify a css file, we tell gulp to run the cssInject task
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

});

// create a task cssInject that is called every time we modify a css file
// ['styles'] is a dependency and it tells gulp not to run the callback function untill the styles task is finished 
// we need to set up that dependency because we don't want to inject the new css file only after it was processed by postcss
gulp.task('cssInject', ['styles'], function(){
  // src to set up what css file we want to "inject" in the browser
  return gulp.src('./app/temp/styles/styles.css')
    // stream tells browserSync to send to the browser the new css file
    .pipe(browserSync.stream());
});
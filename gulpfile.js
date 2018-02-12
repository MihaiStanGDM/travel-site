var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('default', function(){
	console.log("you created a gulp task")
})

gulp.task('html', function(){
	console.log("something using to the HTML")
})
gulp.task('styles', function(){
	console.log("sass or post css task running here")
})

gulp.task('watch', function(){

	watch('./app/index.html', function(){
		gulp.start('html');
	});

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('styles');
	})

})
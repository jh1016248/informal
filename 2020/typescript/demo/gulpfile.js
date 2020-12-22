const gulp = require('gulp');
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");

const paths = {
    pages:['src/*.html']
};

gulp.task('copy-html', () => {
    return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task("ts", gulp.parallel( 'copy-html', () => {
    return browserify({
        basedir:".",
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
}));

gulp.task('watch', function() {
    gulp.watch(`src/*.ts`, gulp.series('ts'));
})

gulp.task('default', gulp.series(['ts', 'watch']))

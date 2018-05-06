var gulp = require('gulp');
var imagemin = require('gulp-imagemin');//压缩图片
var newer = require('gulp-newer');//判断文件是不是已经处理过
var htmlClean = require('gulp-htmlclean');//压缩html
var uglify = require('gulp-uglify');//压缩js
var stripDebug = require('gulp-strip-debug');//去除js中的调试语句和console语句
var concat = require('gulp-concat');//拼接js
var less = require('gulp-less');
var postcss = require('gulp-postcss');//处理css
var autoprefixer = require('autoprefixer');//自动添加浏览器前缀
var cssnano = require('cssnano');//压缩css
var connect = require('gulp-connect');//创建虚拟服务器

//在命令行输入 export NODE_ENV=development
var devMode = process.env.NODE_ENV == 'development';//判断是不是开发环境

//gulp.task('console',function (){
//    console.log(devMode);
//})


var folder = {
    src: './src',
    build: './build'
}

gulp.task('images',function (){
    gulp.src(folder.src + '/img/*')
        .pipe(newer(folder.build + '/img'))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + '/img'));
})

gulp.task('html', function(){
    var page = gulp.src(folder.src + '/html/*').pipe(connect.reload());
    if(!devMode){
        page.pipe(htmlClean());
    }
    page.pipe(gulp.dest(folder.build + '/html'));
})

gulp.task('js', function (){
    var page = gulp.src(folder.src + '/js/*').pipe(connect.reload());
    if(!devMode){
        page.pipe(stripDebug())
            .pipe(uglify());
    }
    page.pipe(gulp.dest(folder.build + '/js'));
})

gulp.task('css', function (){
    var page =  gulp.src(folder.src + '/css/*').pipe(connect.reload()).pipe(less());
    if(!devMode){
        page.pipe(postcss([autoprefixer(), cssnano()]));
    }
    page.pipe(gulp.dest(folder.build + '/css'));
})

gulp.task('watch', function (){
    gulp.watch(folder.src + '/html/*', ['html']);
    gulp.watch(folder.src + '/css/*', ['css']);
    gulp.watch(folder.src + '/js/*', ['js']);
    gulp.watch(folder.src + '/img/*', ['images']);
})

gulp.task('server', function (){
    connect.server({
        port: 9999,//修改端口
        livereload: true//自动刷新
    });
})

gulp.task('default', ['html', 'js', 'images', 'css', 'watch', 'server']);



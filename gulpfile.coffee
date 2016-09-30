# gulp
gulp = require 'gulp'
# 编译器
jade = require 'gulp-pug'        # jade(pug)
sass = require 'gulp-sass-china' # sass
babel = require 'gulp-babel'     # babel编译器
coffee = require 'gulp-coffee'   # CoffeeScript
react = require 'gulp-react'     # react
# 格式化插件
uglify = require 'gulp-uglify'     # 压缩js
imagemin = require 'gulp-imagemin' # 压缩图片
utf8convert = require 'gulp-utf8-convert'                  # 文件转换成utf-8
bom = require 'gulp-bom'                                   # 文件转换成有bom
delGulpsassBlankLines = require 'del-gulpsass-blank-lines' # 删除空行
prettify = require 'gulp-prettify'                         # 格式化html
# 只传递更改过的文件
changed = require 'gulp-changed'
# 错误处理
plumber = require 'gulp-plumber'
errorHandler = require './errorHandler.coffee'
# 自动刷新
browserSync = require 'browser-sync'
  .create()
reload = browserSync.reload
# 当前文件位置
dirname = __dirname

#主函数
gulpfile = ()->
  # html
  gulp.task 'html', ['img'], ()->
    src = dirname + '/src/html/**/*.html'
    build = dirname + '/build/html'
    gulp.src src
      .pipe changed build,
        extension: '.html'
      .pipe gulp.dest build
    return

  # jade
  gulp.task 'jade', ['img'], ()->
    src = dirname + '/src/jade/**/*.jade'
    build = dirname + '/build/html'
    gulp.src src
      .pipe changed build,
        extension: '.html'
      .pipe plumber
        errorHandler: errorHandler
      .pipe jade
        pretty: true
      .pipe prettify
        indent_size: 4
        unformatted: ['br', 'var']
      .pipe delGulpsassBlankLines()
      .pipe gulp.dest build
    return

  # css
  gulp.task 'css', ['img'], ()->
    src = dirname + '/src/css/**/*.css'
    build = dirname + '/build/css'
    gulp.src src
      .pipe changed build,
        extension: '.css'
      .pipe utf8convert()
      .pipe gulp.dest build
    return

  # sass
  gulp.task 'sass', ['img'], ()->
    src = dirname + '/src/sass/**/*.sass'
    build = dirname + '/build/css'
    gulp.src src
      .pipe changed build,
        extension: '.css'
      .pipe sass
          outputStyle: 'compact' # compressed压缩
        .on 'error', sass.logError
      .pipe delGulpsassBlankLines()
      .pipe utf8convert()
      .pipe gulp.dest build
    return

  # js
  gulp.task 'js', ()->
    src = dirname + '/src/js/**/*.js'
    build = dirname + '/build/js'
    gulp.src src
      .pipe changed build,
        extension: '.js'
      # .pipe uglify()
      .pipe utf8convert()
      .pipe bom()
      .pipe gulp.dest build
    return

  # ECMA6
  gulp.task 'ecma6', ()->
    src = dirname + '/src/es/**/*.js'
    build = dirname + '/build/js'
    gulp.src src
      .pipe changed build,
        extension: '.js'
      .pipe plumber
        errorHandler: errorHandler
      .pipe babel
        presets: ['es2015']
      # .pipe uglify()
      .pipe utf8convert()
      .pipe bom()
      .pipe gulp.dest build
    return

  # CoffeeScript
  gulp.task 'coffee', ()->
    src = dirname + '/src/coffee/**/*.coffee'
    build = dirname + '/build/js'
    gulp.src src
      .pipe changed build,
        extension: '.js'
      .pipe plumber
        errorHandler: errorHandler
      .pipe coffee()
      # .pipe uglify()
      .pipe utf8convert()
      .pipe bom()
      .pipe gulp.dest build
    return

  # react
  gulp.task 'react', ()->
    src = dirname + '/src/jsx/**/*.jsx'
    build = dirname + '/build/js'
    gulp.src src
      .pipe changed build,
        extension: '.js'
      .pipe plumber
        errorHandler: errorHandler
      .pipe react()
      .pipe babel
        presets: ['es2015']
      # .pipe uglify()
      .pipe utf8convert()
      .pipe bom()
      .pipe gulp.dest build
    return

  # 图片
  gulp.task 'img', ()->
    src = dirname + '/src/img/**/*.*'
    build = dirname + '/build/img'
    gulp.src src
      .pipe changed build
      .pipe imagemin()
      .pipe gulp.dest build
    return

  # browser-sync自动刷新
  gulp.task 'reload', ()->
    browserSync.reload()
    return

  # 监视
  gulp.task 'browser-sync', ()->
    browserSync.init
      server:
        baseDir: './build/'
        index: 'html/index.html'
      files: './build/'
      startPath: 'html/index.html'
    # 各种监视的文件流
    gulp.watch dirname + '/src/html/**/*.html', ['html', 'reload']
    gulp.watch dirname + '/src/jade/**/*.jade', ['jade', 'reload']
    gulp.watch dirname + '/src/css/**/*.css', ['css', 'reload']
    gulp.watch dirname + '/src/sass/**/*.sass', ['sass', 'reload']
    gulp.watch dirname + '/src/js/**/*.js', ['js', 'reload']
    gulp.watch dirname + '/src/es/**/*.js', ['ecma6', 'reload']
    gulp.watch dirname + '/src/coffee/**/*.coffee', ['coffee', 'reload']
    gulp.watch dirname + '/src/jsx/**/*.jsx', ['react', 'reload']
    return

  # 默认
  gulp.task 'default', ['html', 'jade', 'css', 'sass', 'js', 'ecma6', 'coffee', 'react', 'img', 'browser-sync']

  return

module.exports = gulpfile
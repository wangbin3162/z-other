const {src, dest, series} = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

// 编译函数
function convertJs () {
  return src('js/components/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('js/components/lib'))
}

exports.build = series(convertJs)

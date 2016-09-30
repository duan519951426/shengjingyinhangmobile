# 错误处理函数
notify = require 'gulp-notify'

errorHandler = (error)->
  args = Array.prototype.slice.call arguments
  notify.onError
      title: 'Compile Error'
      messages: '<%= error.message %>'
    .apply @, args
  return

module.exports = errorHandler

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jsse.cjs.production.min.js')
} else {
  module.exports = require('./jsse.cjs.development.js')
}

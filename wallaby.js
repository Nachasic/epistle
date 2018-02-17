const CONFIG = require('./config')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

module.exports = {
    files: [
        CONFIG.FILE_PATTERN
    ],
    tests: [
        CONFIG.TEST_PATTERN
    ],
    env: {
        kind: 'electron'
    },

    setup: function (wallaby) {
        Enzyme.configure({ adapter: new Adapter() })
    }
}
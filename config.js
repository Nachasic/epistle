const HOME_DIR = 'src'
const OUTPUT_DIR = 'dist'
const TEST_DIR = 'test'

const config = {
    // Dirs
    HOME_DIR: HOME_DIR,
    CACHE_DIR: 'tmp',
    COVERAGE_DIR: 'coverage',


    COMPILE_TARGET: 'browser@es6',

    // Patterns
    OUTPUT_PATTERN: `${OUTPUT_DIR}/$name.js`,
    TEST_PATTERN: `**/${TEST_DIR}/**/*.(test|spec).ts(x)`,
    FILE_PATTERN: `${HOME_DIR}/**/*.ts(x)`,

    CSS_OUT: file => `${OUTPUT_DIR}/${file}`
}

module.exports = config
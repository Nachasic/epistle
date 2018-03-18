const HOME_DIR = 'src'
const OUTPUT_DIR = 'dist'
const TEST_DIR = 'test'

const config = {
    // Dirs
    HOME_DIR: HOME_DIR,
    DIST_DIR: OUTPUT_DIR,
    CACHE_DIR: 'tmp',
    COVERAGE_DIR: 'coverage',
    RENDERER_DIR: `${HOME_DIR}/renderer`,
    MAIN_DIR: `${HOME_DIR}/main`,


    COMPILE_TARGET: 'electron',

    // Patterns
    OUTPUT_PATTERN_RENDERER: `${OUTPUT_DIR}/renderer/$name.js`,
    OUTPUT_PATTERN_MAIN: `${OUTPUT_DIR}/main/$name.js`,
    TEST_PATTERN: `**/${TEST_DIR}/**/*.(test|spec).(tsx|ts)`,
    FILE_PATTERN: `${HOME_DIR}/**/*.ts(x)`,

    CSS_OUT: file => `${OUTPUT_DIR}/renderer/${file}`
}

module.exports = config
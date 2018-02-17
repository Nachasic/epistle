const {
    FuseBox,
    ReplacePlugin,
    WebIndexPlugin,
    CSSPlugin,
    SassPlugin,
    CSSModules
} = require('fuse-box')
const { src, task, context } = require('fuse-box/sparky')
const CONFIG = require('./config')

context(
    class {
        getConfig () {
            return FuseBox.init({
                useTypescriptCompiler: true,
                homeDir: CONFIG.HOME_DIR,
                target: CONFIG.COMPILE_TARGET,
                output: CONFIG.OUTPUT_PATTERN,
                hash: this.__PROD__,
                sourceMaps: {
                    project: !this.__PROD__,
                    vendor: false
                },
                plugins: [
                    WebIndexPlugin(),
                    [
                        SassPlugin(),
                        CSSPlugin()
                    ],
                    [
                        SassPlugin(),
                        CSSModules(),
                        CSSPlugin()
                    ],
                    CSSPlugin({
                        inject: true,
                        outFile: CONFIG.CSS_OUT
                    }),
                    this.__PROD__ && QuantumPlugin({
                        bakeApiIntoBundle: 'app',
                        uglify: true,
                        css : true
                    }),
                    ReplacePlugin({
                        'fuse.process.env': this.__PROD__ ? 'production' : 'develop'
                    })
                ]
            })
        }

        produceBundle (fuse) {
            const app = fuse.bundle('app')

            if (!this.__PROD__) {
                app.watch()
                app.hmr()
            } else {
            }
            app.instructions(' > index.tsx')

            return app
        }
    }
)

const tasks = {
    clean: () =>
        src('dist')
            .clean('dist')
            .exec(),

    default: async context => {
        context.__PROD__ = false
        const fuse = context.getConfig()

        fuse.dev()
        context.produceBundle(fuse)

        await fuse.run()
    },

    // test: async context => {
    //     context.__PROD__ = false
    //     const fuse = context.getConfig()

    //     fuse.dev()
    //     context.testBundle(fuse)

    //     await fuse.run
    // },

    dist: async context => {
        context.__PROD__ = true
        const fuse = context.getConfig()

        fuse.dev()
        context.produceBundle(fuse)
    }
}

task('clean', tasks.clean)
task('default', ['clean'], tasks.default)
task('dist', ['clean'], tasks.dist)
// task('test', ['clean'], tasks.test)
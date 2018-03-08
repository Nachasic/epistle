const {
    FuseBox,
    ReplacePlugin,
    WebIndexPlugin,
    QuantumPlugin,
    EnvPlugin,
    CSSPlugin,
    SassPlugin,
    CSSModules
} = require('fuse-box')
const { src, task, context } = require('fuse-box/sparky')
const { spawn } = require('child_process')
const path = require('path')
const express = require('express')

const CONFIG = require('./config')

context(
    class {
        getRendererConfig () {
            return FuseBox.init({
                useTypescriptCompiler: true,
                homeDir: CONFIG.RENDERER_DIR,
                target: CONFIG.COMPILE_TARGET,
                output: CONFIG.OUTPUT_PATTERN_RENDERER,
                hash: this.__PROD__,
                sourceMaps: {
                    project: !this.__PROD__,
                    vendor: false
                },
                plugins: [
                    WebIndexPlugin({
                        title: "FuseBox electron demo",
                        template: "src/renderer/index.html",
                        path: this.__PROD__ ? "." : "/renderer/"
                    }),
                    [
                        SassPlugin(),
                        CSSPlugin()
                    ],
                    [
                        CSSModules({
                            useDefault: false
                        }),
                        CSSPlugin()
                    ],
                    CSSPlugin({
                        inject: true,
                        outFile: CONFIG.CSS_OUT
                    }),
                    this.__PROD__ && QuantumPlugin({
                        bakeApiIntoBundle: 'renderer',
                        uglify: true,
                        css : true
                    }),
                ],
                useTypescriptCompiler: true
            })
        }

        getMainConfig () {
            return FuseBox.init({
                homeDir: CONFIG.MAIN_DIR,
                output: CONFIG.OUTPUT_PATTERN_MAIN,
                target: 'server',
                experimentalFeatures: true,
                cache: !this.__PROD__,
                sourceMaps: {
                    project: !this.__PROD__,
                    inline: false,
                    sourceRoot: __dirname,
                    vendor: false,
                },
                plugins: [
                    EnvPlugin({ NODE_ENV: this.__PROD__ ? 'production' : 'development'}),
                    this.__PROD__ && QuantumPlugin({
                        bakeApiIntoBundle: 'main',
                        target: 'server',
                        treeshake: true,
                        removeExportsInterop: false,
                        uglify: true
                    })
                ]
            })
        }

        produceRendererBundle (fuse) {
            const app = fuse.bundle('renderer')

            if (!this.__PROD__) {
                app.hmr()
                app.watch()
            }
            app.instructions('> [index.tsx] + fuse-box-css')

            return app
        }

        produceMainBundle (fuse) {
            const app = fuse.bundle('main')

            if (!this.__PROD__) {
                app.watch()
            }
            app.instructions('> [main.ts]')

            return app
        }
    }
)

const tasks = {
    'clean:dist': () =>
        src('dist')
            .clean('dist')
            .exec(),
        
    'clean:cache': () =>
        src('dist')
            .clean('.fusebox')
            .exec(),

    'dev:main': async context => {
        context.__PROD__ = false
        const fuse = context.getMainConfig()

        context.produceMainBundle(fuse)

        await fuse.run()
        .then(() => {
            const child = spawn('npm', ['run', 'electron'], { shell: true })
            child.stdout.on('data', function(data) {
                console.log(data.toString());
                //Here is where the output goes
            });
            child.stderr.on('data', function(data) {
                console.error(data.toString());
                //Here is where the error output goes
            });
        })
    },

    'build:main': async context => {
        context.__PROD__ = true
        const fuse = context.getMainConfig()

        context.produceMainBundle(fuse)

        await fuse.run()
    },

    'dev:renderer': async context => {
        context.__PROD__ = false
        const fuse = context.getRendererConfig()

        fuse.dev({ root: false }, server => {
            const dist = path.join(__dirname, CONFIG.DIST_DIR)
            const app = server.httpServer.app

            app.use('/renderer/', express.static(path.join(dist, 'renderer')))
            app.get("*", (req, res) => res.sendFile(path.join(dist, 'renderer/index.html')))
        })
        context.produceRendererBundle(fuse)

        await fuse.run()
    },

    'build:renderer': async context => {
        context.__PROD__ = true
        const fuse = context.getRendererConfig()

        context.produceRendererBundle(fuse)

        await fuse.run()
    }
}

task('clean:dist', tasks['clean:dist'])
task('clean:cache', tasks['clean:cache'])

task('dev:renderer', tasks['dev:renderer'])
task('dev:main', tasks['dev:main'])

task('build:renderer', tasks['build:renderer'])
task('build:main', tasks['build:main'])

// Development build
task('default', [
    'clean:dist',
    'clean:cache',
    'dev:renderer',
    'dev:main'
])

// Production build
task('dist', [
    'clean:dist',
    'clean:cache',
    'build:renderer',
    'build:main'
])
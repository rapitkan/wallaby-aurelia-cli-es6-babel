'use strict';
const path = require('path');
const project = require('./aurelia_project/aurelia.json');

const eagerDeps = project.build.bundles[1].prepend.map(x => ({ pattern: x, instrument: false }));
const appSrc = [
    project.cssProcessor.source,
    project.markupProcessor.source,
    project.transpiler.source,
    'test/unit/setup.js'
].map(x => ({ pattern: x.split('\\').join('/'), load: false }));

const files = eagerDeps.concat(appSrc);
const tests = [
    { pattern: 'test/unit/**/*.spec.js', load: false }
];
const packages = project.build.bundles[1].dependencies.reduce((prev, curr) => {
    let moduleName, modulePath, moduleMain;

    if (curr.path) {
        moduleName = moduleMain = curr.name;
        modulePath = path
            .relative(__dirname, path.resolve(__dirname, 'aurelia_project', curr.path))
            .split('\\').join('/');

        if (curr.main) {
            moduleMain = curr.main;
        }
    }
    else {
        moduleName = moduleMain = curr;
        modulePath = 'node_modules/'.concat(moduleName).concat('/dist/amd');
    }

    if (moduleName.startsWith('aurelia')) {
        const name = JSON.stringify(moduleName);
        const path = JSON.stringify(modulePath);
        const main = JSON.stringify(moduleMain);

        return `${prev}{ name: ${name}, location: ${path}, main: ${main} },`;
    }
    else {
        return prev;
    }
}, '');

module.exports = (wallaby) => {

    return {
        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },

        debug: true,

        env: {
            type: 'browser'
        },

        files: files,

        tests: tests,

        middleware: (app, express) => {
            app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
            app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
        },

        setup: ((w) => {
            w.delayStart();

            requirejs.config({
                baseUrl: '/',

                paths: {
                    'text': 'node_modules/text/text'
                },

                packages: [
                    // packages
                ]
            });

            require(['test/unit/setup.js'].concat(w.tests), () => {
                w.start();
            });
        }).toString().replace('// packages', packages)
    };
};
'use strict'
const fs = require('fs')
const upath = require('upath')
const render = require('render-html')
const sh = require('shelljs')
const prettier = require('prettier')

module.exports = function renderPug(filePath) {
    const destPath = filePath
        .replace(/src\/pug\//, 'dist/')
        .replace(/\.html$/, '.html')
    const srcPath = upath.resolve(upath.dirname(__filename), '../src')

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`)

    const html = fs.readFileSync(filePath, 'utf8').replace(/(\r\n|\n|\r)/gm, '');

    const destPathDirname = upath.dirname(destPath)
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname)
    }

    fs.writeFileSync(destPath, html);
    /* const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore',
    })

    fs.writeFileSync(destPath, prettified) */
}

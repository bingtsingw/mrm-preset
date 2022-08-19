const {
    ini,
    deleteFiles
} = require('mrm-core');

module.exports = function task() {
    deleteFiles('.editorconfig');

    ini('.editorconfig', 'http://editorconfig.org').set('_global', {
            root: true
        }).set('*', {
            charset: 'utf-8',
            end_of_line: 'lf',
            insert_final_newline: true,
            indent_style: 'space',
            indent_size: 2,
            trim_trailing_whitespace: true,

        })
        .set('*.md', {
            trim_trailing_whitespace: false,
        })
        .set('Makefile', {
            indent_style: 'tab'
        }).
    save()
};

module.exports.description = 'Add EditorConfig';

const fs = require('fs');
const archiver = require('archiver');

module.exports = function (snippets) {

    let output = fs.createWriteStream('Emoji Pack.alfredsnippets');
    let archive = archiver('zip');

    archive.on('error', (err) => {
        throw err;
    });
    archive.pipe(output);

    snippets.forEach((snippet) => {
        archive.append(JSON.stringify(snippet, null, 2), {
            name: `${snippet.alfredsnippet.name} - ${snippet.alfredsnippet.uid}.json`
        });
    });

    archive.file('src/icon.png', { name: 'icon.png' });

    archive.finalize();

}

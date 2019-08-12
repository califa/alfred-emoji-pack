const uuidv4 = require('uuid/v4');

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports = function (newSnippets) {

    async function getOriginalVsNew() {
        return await readFile('./original-emoji-pack/original-vs-new-snippets.json', 'utf-8');
    }

    return getOriginalVsNew().then(oldVsNew => {

        JSON.parse(oldVsNew).forEach(snippet => {
            newSnippets.push({
                alfredsnippet: {
                    snippet: snippet.originalSnippet.snippet,
                    uid: uuidv4(),
                    name: snippet.originalSnippet.name.replace(/:/g, ''),
                    keyword: snippet.originalSnippet.keyword.replace(/:/g, ''),
                }
            });
        });

        return newSnippets;
    });
}

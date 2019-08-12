const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const generateNewSnippets = require('../build-snippets-archive/snippets');

async function getOriginalSnippets() {
    return await readFile('./original-emoji-pack/original-snippets.json', 'utf-8');
}

getOriginalSnippets().then(snippets => {

    let originalSnippets = [];

    // Create a new Object, which only contains the "important" snippet information
    JSON.parse(snippets).forEach((snippet) => {
        originalSnippets.push({
            name: snippet.alfredsnippet.name,
            snippet: snippet.alfredsnippet.snippet,
            keyword: snippet.alfredsnippet.keyword,
        });
    });

    return originalSnippets;
})
.then(originalSnippets => {

    // Create a similar Object for our "new" snippets
    let newSnippets = generateNewSnippets().map(snippet => {
        return {
            name: snippet.alfredsnippet.name,
            snippet: snippet.alfredsnippet.snippet,
            keyword: snippet.alfredsnippet.keyword.replace(/_/g, ' '),
        }
    })


    let allSnippetsWhichDiffer = [];

    // Loop through the original Snippets and check if the keyword differs from the new snippets

    originalSnippets.forEach(snippet => {

        // Check if old key word exists in "new Snippets"-object
        let doesOldKeywordExistInNewSnippets = newSnippets.filter(newSnippet => {
            return snippet.keyword == newSnippet.keyword;
        }).length > 0;

        if (!doesOldKeywordExistInNewSnippets) {

            let newSnippetWhichDiffers = newSnippets.filter(newSnippet => {
                return snippet.snippet == newSnippet.snippet;
            })[0];

            allSnippetsWhichDiffer.push({
                originalSnippet: snippet,
                newSnippet: newSnippetWhichDiffers
            });
        }
    });

    return allSnippetsWhichDiffer;

})
.then(allSnippetsWhichDiffer => {

    fs.writeFile('./original-emoji-pack/original-vs-new-snippets.json', JSON.stringify(allSnippetsWhichDiffer, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
    });
})

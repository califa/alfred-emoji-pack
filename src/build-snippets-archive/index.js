const createNewSnippets = require('./snippets.js');
const archiveBuilder = require('./archiveBuilder.js');
const patchNewSnippets = require('./patchNewSnippets.js');

let snippets = createNewSnippets();

// Create Archive with Patch
snippets = patchNewSnippets(snippets);
snippets.then(snippets => archiveBuilder(snippets));

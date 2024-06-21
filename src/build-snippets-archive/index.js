import createNewSnippets from './snippets.js';
import archiveBuilder from './archiveBuilder.js';
import patchNewSnippets from './patchNewSnippets.js';

let snippets = createNewSnippets();

// Create Archive with Patch
snippets = patchNewSnippets(snippets);
snippets.then(snippets => archiveBuilder(snippets));

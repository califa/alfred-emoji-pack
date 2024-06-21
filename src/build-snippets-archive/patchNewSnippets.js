import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'node:fs/promises';

export default function (newSnippets) {

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
          keyword: snippet.originalSnippet.keyword,
        }
      });
    });

    return newSnippets;
  });
}

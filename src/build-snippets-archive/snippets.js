import { gemoji, emojiToName } from 'gemoji';
import { v4 as uuidv4 } from 'uuid';

import { otherSnippets } from './otherSnippetsAndEmojis.js';

export default function () {

  let snippets = [];

  gemoji.forEach((emojiDetails) => {

    let emoji = emojiDetails.emoji;
    let uuid = uuidv4();

    let names = emojiDetails.names.join(' ').replace(/_/g, ' ');
    let tags = emojiDetails.tags.join(' ');

    // Build JSON used by Alfred
    let snippetContent = {
      alfredsnippet: {
        snippet: emoji,
        uid: uuid,
        name: `${emoji} ${names} ${tags ? `- ${tags}` : ``}`,
        keyword: `:${emojiToName[emoji]}:`
      }
    };

    snippets.push(snippetContent);
  });

  otherSnippets.forEach(snippet => snippets.push(snippet));

  // Remove Duplicate Snippets
  return snippets.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.alfredsnippet.snippet).indexOf(obj.alfredsnippet.snippet) === pos;
  })
}

const gemoji = require('gemoji');
const uuidv4 = require('uuid/v4');
const otherSnippets = require('./otherSnippetsAndEmojis.js');

module.exports = function () {

    let snippets = [];

    Object.keys(gemoji.name).forEach((emojiName) => {

        let emoji = gemoji.name[emojiName];
        let uuid = uuidv4();

        let names = emoji.names.join(' ').replace(/_/g, ' ');
        let tags = emoji.tags.join(' ');

        // Build JSON used by Alfred
        let snippetContent = {
            alfredsnippet: {
                snippet: emoji.emoji,
                uid: uuid,
                name: `${emoji.emoji} ${names}${tags ? ` - ${tags}` : ``}`,
                keyword: `:${emoji.name}:`
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

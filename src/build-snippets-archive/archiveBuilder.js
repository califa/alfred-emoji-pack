import { createWriteStream } from 'node:fs';
import archiver from 'archiver';

export default function (snippets) {

  let output = createWriteStream('Emoji Pack.alfredsnippets');
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

import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import fs from 'node:fs';
import path from 'node:path';


// Reverse engineered and stolen from https://conv.mp3youtube.cc


async function getToken(youtubeUrl) {
    const id = youtubeUrl.searchParams.get('v');

    const headers = new Headers({
        'User-Agent': '', // fuck off Cloudflare
    });
    
    const response = await fetch(`https://conv.mp3youtube.cc/download/${id}`, {
        method: 'GET',
        headers: headers,
    });
    const html = await response.text();
    
    const token = html.match(/ data-s="(.*)" /)[1];
    return btoa(token.split('').reverse().join(''));
}

async function getDownloadUrl(youtubeUrl) {
    const headers = new Headers({
        'User-Agent': '', // fuck off Cloudflare
        'Origin': 'https://conv.mp3youtube.cc',
        'Key': await getToken(youtubeUrl),
    });

    const body = new URLSearchParams({
        'link': youtubeUrl.toString(),
        'format': 'mp3',
        'audioBitrate': 320,
    });
    
    const response = await fetch('https://api.mp3youtube.cc/v2/converter', {
        method: 'POST',
        headers: headers,
        body: body,
    });
    const json = await response.json();

    return json['url'];
}


export async function downloadMusicVideo(youtubeUrl, uploadDirectory) {
    for (let i = 0; i < 3; ++i) {
        try {
            const downloadUrl = await getDownloadUrl(new URL(youtubeUrl));
            const { body } = await fetch(downloadUrl);

            const filename = 'test'; // TODO: random file name
            
            const writeStream = fs.createWriteStream(path.join(uploadDirectory, filename));
            await finished(Readable.fromWeb(body).pipe(writeStream));

            return {
                filename: filename,
                extension: '.mp3',
            };
        } catch (error) {
            console.log(error);
        }
    }

    return null;
}

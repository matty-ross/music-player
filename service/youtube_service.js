import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';


// Reverse engineered and stolen from https://conv.mp3youtube.cc


async function getToken(youtubeUrl) {
    const id = youtubeUrl.searchParams.get('v');
    
    const response = await fetch(`https://conv.mp3youtube.cc/download/${id}`, {
        method: 'GET',
        headers: {
            'User-Agent': '', // fuck off Cloudflare
        },
    });
    const html = await response.text();
    
    const token = html.match(/data-s="(.*?)"/)[1];
    return btoa(token.split('').reverse().join(''));
}

async function getDownloadUrl(youtubeUrl) {
    const response = await fetch('https://api.mp3youtube.cc/v2/converter', {
        method: 'POST',
        headers: {
            'User-Agent': '', // fuck off Cloudflare
            'Origin': 'https://conv.mp3youtube.cc',
            'Key': await getToken(youtubeUrl),
        },
        body: new URLSearchParams({
            'link': youtubeUrl.toString(),
            'format': 'mp3',
            'audioBitrate': 320,
        }),
    });
    const json = await response.json();

    return json['url'];
}


export async function downloadMusicVideo(youtubeUrl, uploadDirectory) {
    const filename = crypto.randomBytes(16).toString('hex');
    
    for (let i = 0; i < 3; ++i) {
        try {
            const downloadUrl = await getDownloadUrl(new URL(youtubeUrl));
            
            const response = await fetch(downloadUrl);
            const data = await response.bytes();
            
            fs.writeFileSync(path.join(uploadDirectory, filename), data);

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

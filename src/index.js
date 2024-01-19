const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Im listening in port ${port}`)
});

app.get('/download', async (request, response) => {
    const { url } = request.query

    if (!ytdl.validateURL(url)) {
        response.sendStatus(400)
    }
    let title = 'video'

    await ytdl.getBasicInfo(url, {
        format: 'mp4'
    }, (err, info) => {
        title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    response.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    ytdl(url, {
        format: 'mp4',
    }).pipe(response);
})
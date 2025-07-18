import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { retrieveSpotifyLinkData, retrieveYoutubeLinkData } from "./modules/dataExtraction.js";
import { convertSpotifyLinkToYoutubeLink, convertYoutubeLinkToSpotifyLink } from "./modules/linkConversions.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve website
app.use(express.static(path.join(__dirname, "..", "dist")));

/**
 * GET /convert?link=<link>
 * Converts YouTube Link to Spotify Link and vice-versa
 */
app.get('/convert', async (req, res) => {
    const link = req.query.link;

    if (!link || typeof link !== "string") {
        res.status(400).json({ message: "Invalid link" });
        return;
    }

    try {
        if (link.includes('music.youtube.com')) {
            // Extract relevant Metadata
            const linkData = await retrieveYoutubeLinkData(link);

            //search spotify api and find best result
            const spotifyLinkData = await convertYoutubeLinkToSpotifyLink(linkData);

            res.json(spotifyLinkData);
            return;

        } else if (link.includes('open.spotify.com')) {
            // Extract relevant Metadata
            const linkData = await retrieveSpotifyLinkData(link);

            // search youtube api and find best match
            const youtubeLinkData = await convertSpotifyLinkToYoutubeLink(linkData);

            res.json(youtubeLinkData);
            return;

        } else {
            res.status(400).json({ message: "Invalid link type, please provide a Youtube Music or Spotify Link" });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error"
        });
        return;
    }
});

// Catch all route to serve index
app.get(/^.*$/, (_, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

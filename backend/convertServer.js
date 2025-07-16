import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { retrieveSpotifyLinkData, retrieveYoutubeLinkData } from "./modules/dataExtraction.js";
import { convertSpotifyLinkToYoutubeLink, convertYoutubeLinkToSpotifyLink } from "./modules/linkConversions.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;


app.get("/", (_, res) => {
    res.json({ message: "Hello from the backend!" });
});


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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

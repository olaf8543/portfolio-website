/** @import { linkRetrievalData, musicLinkData, conversionData} from './types' */
import axios from "axios";
import dotenv from "dotenv";
import { calculateMatchConfidence, calculateStringSimilarity } from "./dataManipulation.js";
import { retrieveSpotifyResponseData, retrieveYoutubeResponseData } from "./dataExtraction.js";


dotenv.config();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

/**
 * Take youtube link data, and perform a search of spotify's
 * api to find the best match for that song. 
 * @param {linkRetrievalData} youtubeLinkData
 * @returns {Promise<conversionData>} spotifyLinkData
 */
export async function convertYoutubeLinkToSpotifyLink(youtubeLinkData) {
    if (!clientId || !clientSecret) {
        throw new Error("Spotify credentials not found");
    }

    const query = `${youtubeLinkData.name} ${youtubeLinkData.artists[0]}`;
    const apiUrl = "https://api.spotify.com/v1/search";

    console.log(youtubeLinkData);

    console.log(query);


    const searchParams = new URLSearchParams();
    searchParams.append('grant_type', 'client_credentials');
    searchParams.append('client_id', clientId);
    searchParams.append('client_secret', clientSecret);

    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token',
            searchParams.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        const accessToken = tokenResponse.data.access_token;

        const response = await axios.get(apiUrl, {
            params: {
                q: query,
                type: "track"
            },
            headers: {
                'Authorization': "Bearer " + accessToken,
            },
        })

        let bestIndex = 0;
        let bestConfidence = 0;
        for (let i = 0; i < response.data.tracks.items.length; i++) {
            const confidence = calculateMatchConfidence(youtubeLinkData, retrieveSpotifyResponseData(response, i))

            if (confidence > bestConfidence) {
                bestIndex = i;
                bestConfidence = confidence;
            }
        }

        const best = retrieveSpotifyResponseData(response, bestIndex);
        console.log(best);

        return { retrievedSong: retrieveSpotifyResponseData(response, bestIndex), confidence: bestConfidence };

    } catch (error) {
        console.error("Api Error: " + error);
        throw new Error;
    }
}

/**
 * Take youtube link data, and perform a search of spotifies
 * api to find the best match for that song. 
 * @param {linkRetrievalData} spotifyLinkData
 * @returns {Promise<conversionData>} youtubeLinkData
 */
export async function convertSpotifyLinkToYoutubeLink(spotifyLinkData) {
    if (!youtubeApiKey) {
        console.error("Youtube Api key not found");
        throw new Error("Youtube credentials not found");
    }

    const query = `${spotifyLinkData.name} ${spotifyLinkData.artists.join(" ")}`
    const apiUrl = "https://youtube.googleapis.com/youtube/v3/search"

    console.log(query);

    try {
        const response = await axios.get(apiUrl, {
            params: {
                key: youtubeApiKey,
                q: query,
                maxResults: 10,
                type: "video",
                videoCategoryId: 10,
                part: "snippet"
            }
        })
        // Handle empty results
        if (!response.data.items || response.data.items.length === 0) {
            throw new Error("No matching YouTube videos found");
        }
        let bestIndex = 0;
        let bestConfidence = 0;
        for (let i = 0; i < response.data.items.length; i++) {
            const youtubeResponseData = retrieveYoutubeResponseData(response, i);
            let confidence = calculateMatchConfidence(spotifyLinkData, youtubeResponseData);

            if (confidence > bestConfidence) {
                bestIndex = i;
                bestConfidence = confidence;

                if (confidence >= 85 && response.data.items[i].snippet.channelTitle.includes(" - Topic")) {
                    break;
                }

            }
        }

        const best = retrieveYoutubeResponseData(response, bestIndex);
        console.log(best);

        return { retrievedSong: retrieveYoutubeResponseData(response, bestIndex), confidence: bestConfidence };

    } catch (error) {
        console.error("Api Error: " + error);
        throw new Error;
    }
}

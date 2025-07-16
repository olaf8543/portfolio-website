/** @import { linkRetrievalData, musicLinkData } from './types' */ import dotenv from "dotenv";
import { cleanYoutubeTitle } from "./dataManipulation.js";
import axios from "axios";

dotenv.config();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

/**
 * Helper function to get Highest quality
 * youtube thumbnail
 * @param {Axios.AxiosXHR} response
 * @param {number} index
 * @returns {string}
 */
export function retrieveYoutubeThumbnail(response, index) {
    try {
        const data = response.data.items[index].snippet.thumbnails;

        if (data.maxres && data.maxres.url) {
            return data.maxres.url;
        } else if (data.standard && data.standard.url) {
            return data.standard.url;
        } else if (data.high && data.high.url) {
            return data.high.url;
        } else if (data.medium && data.medium.url) {
            return data.medium.url;
        } else if (data.default && data.default.url) {
            return data.default.url;
        }
        return "";
    } catch (error) {
        console.error("Error retrieving thumbnail:", error);
        return "";
    }
}

/**
 * Extract the id from the spotify link.
 * eg.
 *     https://open.spotify.com/artist/6yJ6QQ3Y5l0s0tn7b0arrO?si=1_5vMDpqTW2Cp8SVDC0xUw
 *
 * extract the "6yJ6QQ3Y5l0s0tn7b0arrO".
 *
 * @param {string} spotifyLink
 * @returns {musicLinkData}
 */
export function parseSpotifyLinks(spotifyLink) {
    const url = new URL(spotifyLink);
    const pathParts = url.pathname.split("/").filter(part => part.length > 0);

    const id = pathParts[1] || null;
    const type = pathParts[0] || null;

    if (!id || !type) {
        throw new Error("Could not parse link data")
    }

    return { id, type };
}

/**
 * Extract the id from the youtube link.
 * eg.
 *     https://music.youtube.com/watch?v=7vasUIpMjDk&si=D5VLKIlm0jJzTh-a
 *
 * extract the "7vasUIpMjDk".
 *
 * @param {string} youtubeLink
 * @returns {musicLinkData}
 */
export function parseYoutubeLinks(youtubeLink) {
    const url = new URL(youtubeLink);

    const id = url.searchParams.get("v");
    const type = "track";

    if (!id) {
        throw new Error("Could not parse link data")
    }

    return { id, type };
}


/**
 * Take spotify link, extract the link data,
 * and turn it into an api call link,
 * then extract the data from the api call.
 * @param {string} spotifyLink
 * @returns {Promise<linkRetrievalData>}
 */
export async function retrieveSpotifyLinkData(spotifyLink) {

    if (!clientId || !clientSecret) {
        throw new Error("Spotify credentials not found");
    }

    const linkData = parseSpotifyLinks(spotifyLink);

    const apiUrl = "https://api.spotify.com/v1/tracks/" + linkData.id;

    // Get access token
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    const accessToken = tokenResponse.data.access_token;

    const response = await axios.get(apiUrl, {
        headers: {
            'Authorization': "Bearer " + accessToken,
        },
    })

    const id = response.data.id
    const name = response.data.name
    const url = response.data.external_urls.spotify
    const image = response.data.album.images[0].url
    const artist = response.data.artists.map(artist => artist.name)

    return { id: id, name: name, url: url, image: image, artists: artist }
}

/**
 * Take spotify link, extract the link data,
 * and turn it into an api call link,
 * then extract the data from the api call.
 * @param {string} youtubeLink
 * @returns {Promise<linkRetrievalData>}
 */
export async function retrieveYoutubeLinkData(youtubeLink) {

    if (!youtubeApiKey) {
        throw new Error("Youtube credentials not found");
    }

    const linkData = parseYoutubeLinks(youtubeLink);

    const apiUrl = "https://youtube.googleapis.com/youtube/v3/videos";

    const response = await axios.get(apiUrl, {
        params: {
            key: youtubeApiKey,
            part: "snippet",
            id: linkData.id
        }
    });

    const id = response.data.items[0].id
    const url = `https://music.youtube.com/watch?v=${id}`
    const image = retrieveYoutubeThumbnail(response, 0)
    const artist = [response.data.items[0].snippet.channelTitle.replace(" - Topic", "")]
    const name = cleanYoutubeTitle(response.data.items[0].snippet.title, artist)

    return { id: id, name: name, url: url, image: image, artists: artist }
}

/**
 * Helper function to get data from spotify search results
 * @param {Axios.AxiosXHR} response
 * @param {number} index
 * @returns {linkRetrievalData}
 */
export function retrieveSpotifyResponseData(response, index) {
    const data = response.data.tracks.items[index]

    const id = data.id
    const name = data.name
    const url = data.external_urls.spotify || "something"
    const image = data.album.images[0].url
    const artist = data.artists.map(artist => artist.name)

    return { id: id, name: name, url: url, image: image, artists: artist }
}


/**
 * Helper function to get data from youtube search results
 * @param {Axios.AxiosXHR} response
 * @param {number} index
 * @returns {linkRetrievalData}
 */
export function retrieveYoutubeResponseData(response, index) {
    const data = response.data.items[index]

    const id = data.id.videoId
    const url = `https://music.youtube.com/watch?v=${id}`
    const image = retrieveYoutubeThumbnail(response, index)
    const artist = [data.snippet.channelTitle.replace(" - Topic", "")]
    const name = cleanYoutubeTitle(data.snippet.title, artist)

    return { id: id, name: name, url: url, image: image, artists: artist }
}


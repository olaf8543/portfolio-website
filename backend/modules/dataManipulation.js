import he from "he";
/** @import { linkRetrievalData } from './types' */

/** Removes common Youtube title inclusions
 * and cleans youtube's decoded text
 * @param {string} text video title
 * @param {string[]} artist artist
 * @returns {string}
 */
export function cleanYoutubeTitle(text, artist = [""]) {
    return he.decode(text)
        .replace("(Official Audio)", "")
        .replace("(Official Lyric Video)", "")
        .replace("(Official Video)", "")
        .replace(`${artist[0]} -`, "")
        .replace(`- ${artist[0]}`, "")
        .trim();
}

/** Cleans up text to allow for better comparing
 * @param {string} text
 * @returns {string}
 */
export function cleanText(text) {
    return text
        // Remove special characters and normalize spaces
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, ' ')
        // Handle various types of quotes
        .replace(/[''""]/g, '')
        // Replace multiple spaces with single space
        .replace(/\s+/g, ' ')
        // Convert to lowercase
        .toLowerCase()
        .trim();
}

/**
 * Removes common featuring variations and parenthetical content
 * @param {string} text
 * @returns {string}
 */
function removeFeaturingArtists(text) {
    return text
        // Remove (feat. Artist)
        .replace(/[\(\[\{](?:feat|ft|featuring|with)\.?\s+[^\)\]\}]+[\)\]\}]/gi, '')
        // Remove feat. Artist without parentheses
        .replace(/(?:feat|ft|featuring|with)\.?\s+[^([\n]+/gi, '')
        // Remove any remaining parentheses content
        .replace(/[\(\[\{][^\)\]\}]*[\)\]\}]/g, '')
        .trim();
}

/**
 * Uses Dice's Coefficient to calculate similarity between two strings
 * @param {string} stringA
 * @param {string} stringB
 * @returns {number} A number between 0 and 100
 */
export function calculateStringSimilarity(stringA, stringB) {
    const cleanedA = cleanText(stringA);
    const cleanedB = cleanText(stringB);

    if ((cleanedA.length < 2) && (cleanedB.length < 2)) {
        return cleanedA === cleanedB ? 100 : 0;
    } else if (cleanedA.length < 2 || cleanedB.length < 2) {
        return 0;
    }

    const bigrams = new Map();
    let matches = 0;

    for (let i = 0; i < cleanedA.length - 1; i++) {
        const bigram = cleanedA.substring(i, i + 2);
        const count = bigrams.get(bigram) || 0;
        bigrams.set(bigram, count + 1);
    }

    for (let i = 0; i < cleanedB.length - 1; i++) {
        const bigram = cleanedB.substring(i, i + 2);
        if (bigrams.has(bigram)) {
            matches++;
            const count = bigrams.get(bigram);
            bigrams.set(bigram, count - 1);
            if (count - 1 === 0) {
                bigrams.delete(bigram);
            }
        }
    }

    return Math.round((2 * matches) / (cleanedA.length + cleanedB.length - 2) * 100);
}

/**
 * Uses Dice's Coefficient to calculate similarity between two strings
 * @param {linkRetrievalData} songA
 * @param {linkRetrievalData} songB
 * @returns {number} A number between 0 and 100
 */
export function calculateMatchConfidence(songA, songB) {
    const titleA = removeFeaturingArtists(songA.name)
    const titleB = removeFeaturingArtists(songB.name)

    const titleSimilarity = calculateStringSimilarity(titleA, titleB);

    let artistSimilarity = 0;
    for (const artistA of songA.artists) {
        for (const artistB of songB.artists) {
            const similarity = calculateStringSimilarity(artistA, artistB);
            if (similarity > artistSimilarity) {
                artistSimilarity = similarity;
            }
        }
    }

    // Song Title is probably more important than the artist
    return Math.round((titleSimilarity * 0.75) + (artistSimilarity * 0.25));
}

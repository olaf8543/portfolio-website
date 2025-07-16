
/**
 * Data I can retrieve from a spotify link
 * @typedef {Object} musicLinkData
 * @property {string} id
 * @property {string} type unused property, README.md for more info
 */

/**
 * Useful data I can find from link retrieval
 * @typedef {Object} linkRetrievalData
 * @property {string} id
 * @property {string} name
 * @property {string} url
 * @property {string} image
 * @property {string[]} artists
 */

/**
 * Data I can retrieve from a spotify link
 * @typedef {Object} conversionData
 * @property {linkRetrievalData} retrievedSong
 * @property {number} confidence
 */

export const Types = {}

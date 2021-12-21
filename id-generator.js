const { customAlphabet } = require('nanoid');
/**
 * 
 * key: used for encryption
 * Number: length of randomized
 */
exports.generateUUID = (number, key) => {
    const nanoid = customAlphabet(key, number)
    return nanoid()
}
'use strict';

const NodeCache = require('node-cache');
const appCache = new NodeCache();

const verifyingCache = (req, res, next) => {
    try {
        if (appCache.has(req.originalUrl)) {
            return res.json(appCache.get(req.originalUrl));
        }
        return next();
    } catch (error) {
        throw new Error(`The original ${req.originalUrl} was not found in the cache`);
    };
};

module.exports = {
    appCache,
    verifyingCache,
}
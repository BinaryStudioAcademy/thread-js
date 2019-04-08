const now = new Date();

module.exports = new Array(25)
    .fill(true)
    .concat(new Array(25).fill(false))
    .map(isLike => ({
        isLike,
        createdAt: now,
        updatedAt: now
    }));

export default `
SELECT
    "p"."id",
    "p"."userId",
    "p"."body",
    (SELECT COUNT(*) FROM "comments" WHERE "p"."id" = "postId") as "commentsCount",
    (SELECT COUNT(*) FROM "postReactions" WHERE "isLike" = true and "p"."id" = "postId") as "likesCount",
    (SELECT COUNT(*) FROM "postReactions" WHERE "isLike" = false and "p"."id" = "postId") as "dislikesCount",
    "p"."createdAt",
    "p"."updatedAt",
    "pi"."path" as "postImage",
    "u"."email",
    "u"."username",
    "ui"."path" as "userImage"
FROM "posts" as "p"
INNER JOIN "users" as "u" ON "u"."id" = "p"."userId"
LEFT JOIN "images" as "ui" ON "u"."imageId" = "ui"."id"
LEFT JOIN "images" as "pi" ON "p"."imageId" = "pi"."id"
`;

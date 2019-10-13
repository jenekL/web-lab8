const express = require('express');
const router = express.Router();
const articleRepo = require('./../db/database');

router.get('/add', async function (req, res, next) {
    const {postId, user, date, text} = req.query;

    const bla = await articleRepo.addComment(postId, user, date, text);
    res.json(bla);
});

module.exports = router;

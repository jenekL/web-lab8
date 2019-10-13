const express = require('express');
const router = express.Router();
const articleRepo = require('./../db/database');

router.post('/add', async function (req, res, next) {
    const {name, author, text, date} = req.query;

   const bla = await articleRepo.addArticle(name, author, text, date);
   res.send(bla);
});

router.get('/getAll', async function (req, res, next) {

    const bla = await articleRepo.getAllArticles();
    res.send(bla);
});

module.exports = router;

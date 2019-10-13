const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const articleScheme = new Schema({
    name: String,
    date: Date,
    text: String,
    author: String,
    comments: [{
        user: String,
        date: Date,
        text: String
    }]
});

// подключение
mongoose.connect("mongodb://localhost:27017/articlesDB", {useNewUrlParser: true});

const Article = mongoose.model("Article", articleScheme);

const articleRepo = {
    addArticle: (name, author, text, date) => {
        return new Promise((resolve, reject) => {

            const article = new Article({
                name: name,
                date: date,
                text: text,
                author: author
            });

            Article.create(article, function (err, doc) {
                //mongoose.disconnect();
                if (err) return console.log(err);

                console.log('Сохранен объект', doc);
                resolve(doc);
            });

        });
    },
    getArticleById: (id) => {
        return new Promise((resolve, reject) => {
            Article.findById(
                id,
                function (err, data) {
                    if (err) return console.log(err);
                    console.log("Обновленный объект", data);
                    resolve(data);
                });
        });
    },
    addComment: (postId, user, date, text) => {
        return new Promise(async (resolve, reject) => {
            const newComment = {user, date, text};

            Article.findByIdAndUpdate(
                postId,
                {$push: {comments: newComment}},
                {new: true},
                (err, result) => {
                    if (err) return console.log(err);
                    resolve(result);
                    console.log(result);
                });

        });
    },
    getAllArticles: () => {
        return new Promise(async (resolve, reject) => {

            Article.find(
                (err, result) => {
                    if (err) return console.log(err);
                    console.log(result);
                    resolve(result);
                   
                });

        });
    },

};


module.exports = articleRepo;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const articleRouter = require('./routes/article');
const commentsRouter = require('./routes/comments');

app.use(morgan(process.env.APP_ENV === 'dev' ?'dev' : 'tiny'));
app.use(cors());
app.use(express.json());

app.use('/article', articleRouter);
app.use('/comments', commentsRouter);

const port = 8081;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/create', (req, res) => {
  res.render('create');
});

let posts = []; 

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  posts.push(newPost);
  res.redirect('/');
});


app.get('/', (req, res) => {
  res.render('index', { posts });
});



app.get('/details/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];
  res.render('details', { post, posts }); 
});

app.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];
  res.render('edit', { post, posts });
});

app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  posts[postId] = { title, content };
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect('/');
});
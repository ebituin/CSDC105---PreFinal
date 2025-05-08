const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');
//const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://netninja:1234@cluster0.c7jjicz.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
    
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.get('/', (req, res) => {
    res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
});

app.use('/blogs', blogRoutes);


app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

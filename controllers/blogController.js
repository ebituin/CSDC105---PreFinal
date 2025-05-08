const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log(err)
            res.status(404).render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_search = (req, res) => {
    const search = req.query.q?.trim();

    const query = search
        ? {
              $or: [
                  { title: { $regex: search, $options: 'i' } },
                  { snippet: { $regex: search, $options: 'i' } },
                  { body: { $regex: search, $options: 'i' } }
              ]
          }
        : {};

    Blog.find(query).sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { 
                title: search ? `Results for "${search}"` : 'All Blogs', 
                blogs: result, 
                searchQuery: search 
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('error', { title: 'Error loading blogs' });
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_search
}
 
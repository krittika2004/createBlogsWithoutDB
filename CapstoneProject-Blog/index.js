import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
const app = express();
const port = 3000;


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [];
//entering the website
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
//create New post
//1.Getting the form
app.get("/createBlog",(req,res)=>{
    res.render("createBlog.ejs");
});
//2.posting the blog data 
app.post("/createBlog",(req,res)=>{
    const newPost = {
        title: req.body["blogTitle"],
        content: req.body["blogContent"],
    };
    posts.push(newPost);
    //console.log("Post Id == ",req.params.id);
    res.redirect('/'); //apne aap hi home pe chla jayega
});
//Viewing the blogs
app.get("/viewBlog",(req,res)=>{
    res.render("viewBlog.ejs", { posts: posts });
})
//Deleting the blogs
//here I am passing index as id parameter hence it works!!
app.delete('/delete/:id', (req, res) => {
    
    const postId = req.params.id; 
    if (postId >= 0 && postId < posts.length) {
        posts.splice(postId, 1);
        res.redirect('/viewBlog');
    } else {
        res.status(404).send('Post not found');
    }
});
//edit posts---passing index as the id from the loop 
app.get('/editBlog/:id', (req, res) => {
    const postId = req.params.id; // No need to convert the id to an integer for GET requests
    const post = posts[postId];
    res.render('editBlog.ejs', { post: post, postId: postId });
});


app.patch('/editBlog/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10); // Convert the id to an integer
    if (postId >= 0 && postId < posts.length) {
        posts[postId] = {
            title: req.body["title"],
            content: req.body["content"]
        };
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})
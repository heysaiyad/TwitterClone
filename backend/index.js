const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB_URI = "mongodb://127.0.0.1:27017/twitterClone";
const port = 3000;

mongoose.connect(DB_URI);

// UserSchema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// contactSchema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});

const Query = mongoose.model("Query", contactSchema);

// PostSchema
const PostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
});
const Post = mongoose.model("Post", PostSchema);


app.get("/", async (req, res) => {
  console.log("Hello");
  res.json("hhhh");
});

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send("A token is required for authentication");
  try {
    req.user = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY");
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

// Registration user
app.post("/registration", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User Registration successfull");
  } catch (error) {
    res.status(500).send("Error Registration user");
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY");
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});



// Create a post

app.post("/createposts", verifyToken, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user.userId,
      title: req.body.title,
      content: req.body.content,
    });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

// Get all posts
app.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});


app.post("/contact", async (req, res) => {
  console.log("/contact called");
  try {
    const query = new Query({
      name: req.body.name,
      email: req.body.email,
      query: req.body.query,
    });
    await query.save();
    res.status(201).send("Successful");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

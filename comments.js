//create web server
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const commentsPath = path.join(__dirname, "comments.json");

//get comments
router.get("/", (req, res) => {
  fs.readFile(commentsPath, "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

//add comment
router.post("/", (req, res) => {
  fs.readFile(commentsPath, "utf8", (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    const newComment = {
      id: req.body.id,
      name: req.body.name,
      comment: req.body.comment,
      date: req.body.date,
    };
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) throw err;
      res.json(comments);
    });
  });
});

//delete comment
router.delete("/:id", (req, res) => {
  fs.readFile(commentsPath, "utf8", (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    const commentId = req.params.id;
    const newComments = comments.filter((comment) => comment.id !== commentId);
    fs.writeFile(commentsPath, JSON.stringify(newComments), (err) => {
      if (err) throw err;
      res.json(newComments);
    });
  });
});

//edit comment
router.put("/:id", (req, res) => {
  fs.readFile(commentsPath, "utf8", (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    const commentId = req.params.id;
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );
    const updatedComment = {
      id: commentId,
      name: req.body.name,
      comment: req.body.comment,
      date: req.body.date,
    };
    comments[commentIndex] = updatedComment;
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) throw err;
      res.json(updatedComment);
    });
  });
});

module.exports = router;
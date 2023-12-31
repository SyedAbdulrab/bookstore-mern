import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log("oo bro error agaya get books route mein:-", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const books = await Book.findById(id);
    return res.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log("oo bro error agaya get books route mein:-", error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Book deleted succesfully",
      books: book,
    });
  } catch (error) {
    console.log("oo bro error agaya get books route mein:-", error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: "brother, don't play with me, this no joke" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = new Book(newBook);
    const savedBook = await book.save();
    return res.status(201).json({ book: savedBook });
  } catch (e) {
    console.log(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: "brother, don't play with me, this no joke" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "No book found with that id" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);
    await result.save();
    return res.status(200).json({
      book: result,
    });
  } catch (error) {
    console.log("oo bro error agaya get books route mein:-", error);
  }
});


export default router;
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js'
const port = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.status(200).send("<h1>Yeah, I'm working huhuhuhu</h1>");
});

app.use('/books',bookRoutes)
app.use(cors())


await mongoose
  .connect(
    "mongodb+srv://syed_abdulrab:syedabdulrab@cluster0.nt7qb.mongodb.net/ese-bookstore?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo DB");
    app.listen(port, () => {
      console.log("server is running on Port ", 3000);
    });
  })
  .catch((err) => {
    console.log("oho error agaya:-", err);
  });

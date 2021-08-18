const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());
const { MongoClient } = require("mongodb");
require("dotenv").config();

const URI =
  "mongodb+srv://edgariux998:edgaras123@cluster0.oekth.mongodb.net/demo5";
const client = new MongoClient(URI);

//gauname visus produktus

app.get("/", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo5").collection("products").find().toArray();
    await con.close();
    res.send(data);
  } catch (e) {
    res.status(500).send({ msg: "Invalid data" });
  }
});

//Vieno producto gavimas

app.get("/products/:brand", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo5")
      .collection("products")
      .find({ brand: req.params.brand })
      .toArray();
    await con.close();

    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

const port = 8080;
app.listen(port, () => console.log("Server is running on port " + port));

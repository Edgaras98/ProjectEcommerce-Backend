const cors = require("cors");

const express = require("express");

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const URI = process.env.URI;
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

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const con = await client.connect();
    const dbRes = await con
      .db("demo5")
      .collection("products")
      .find(ObjectId(id))
      .toArray();
    await con.close();

    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});
//gauname orderius
app.get("/orders", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db("demo6").collection("orders").find().toArray();
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

//Postinam nauja

app.post("/orders", async (req, res) => {
  try {
    const con = await client.connect();
    const response = await con.db("demo6").collection("orders").insertOne({
      name: req.body.name,
      email: req.body.email,
      product_id: req.body.product_id,
      price: req.body.price,
    });
    await con.close();
    res.send(response);
  } catch (e) {
    res.status(400).send({ msg: "failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running on port " + port));

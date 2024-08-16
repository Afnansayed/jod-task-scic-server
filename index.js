const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.khblnbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("FshionX").collection("products");

    //get all products and agreegate pipline for soting and pagination
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;
      const brandFilter = req.query.brand;
      const brandFilters = brandFilter ? brandFilter.split(",") : [];
      const categoryFilter = req.query.category ? req.query.category.split(",") : [];
      const maxPrice = parseFloat(req.query.priceRange) || Number.MAX_VALUE;
     // console.log(maxPrice);

      const pipeline = [];

      // Only apply the $match stage if there are brands to filter by
      if (brandFilters.length > 0) {
        pipeline.push({
          $match: {
            seller: { $in: brandFilters },
          },
        });
      }

      if(categoryFilter.length > 0){
        pipeline.push({
          $match:{category: {$in: categoryFilter}}
        })
      }
      
     pipeline.push({
      $match: {
        price: {$lte: maxPrice},
      }
     })
      // Pagination stages
      pipeline.push({ $skip: page * size }, { $limit: size });

      try {
        const result = await productCollection.aggregate(pipeline).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch products" });
      }
    });
    // -------------------0000000000---------------
     // product count for pagination
     app.get("/productsCount", async (req, res) => {
      const brandFilter = req.query.brand;
      const brandFilters = brandFilter ? brandFilter.split(",") : [];
      const categoryFilter = req.query.category ? req.query.category.split(",") : [];
      const maxPrice = parseFloat(req.query.priceRange) || Number.MAX_VALUE;

      const matchStage = {};

      if (brandFilters.length > 0) {
        matchStage.seller = { $in: brandFilters };
      }

      if(categoryFilter.length > 0){
        matchStage.category = {$in: categoryFilter}
      }

      matchStage.price = {$lte: maxPrice};

      const count = await productCollection.countDocuments(matchStage);
      res.send({ count });
    });
      // ------- 0000 ------------

    //add data in users cllection
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Job-Task-Scic Server Running");
});

app.listen(port, () => {
  console.log(`Job-Task-Scic Server Running on port ${port}`);
});

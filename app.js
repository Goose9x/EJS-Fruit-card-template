const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const ejs = require("ejs");
const fs = require("fs");
// import route
let userRoutes = require("./routes/users.route");
let homepageRoutes = require("./routes/homepage.route");

// Setup template engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
// User 3party middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

// Set up routes
app.get("/", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/data.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let fruits = JSON.parse(data);
      res.render("overview", {
        fruits: fruits,
      });
    }
  });
});
app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  fs.readFile(`${__dirname}/dev-data/data.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let fruits = JSON.parse(data);
      console.log(fruits);
      let findId = fruits.find((e) => {
        return e.id == id;
      });
      console.log(findId);
      res.render("product", {
        fruits: findId,
      });
    }
  });
});

// listen on port
app.listen(3000, () => {
  console.log(`Server is listen on port 3000`);
});


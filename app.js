const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6536439c55f3a283d90da185").then((user) => {
    req.user = user;
    next();
  });
});



app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

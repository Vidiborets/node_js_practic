const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { auth, products, contacts, users } = require("./routes/api");

const app = express();
const formatsLogger = app.get("env") === "developer" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
// app.use("/api/contacts", products);
app.use("/api/products", products);
app.use("/api/users", users);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
module.exports = app;

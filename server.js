const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");


const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("tiny"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) =>
  console.log(`error in mongoose conneciton: ${err.message}`)
);

mongoose.connection.once("open", () => {
  console.log("mongoose connected!");
  app.listen(PORT, (err) => console.log(`http://localhost/${PORT}`));
});
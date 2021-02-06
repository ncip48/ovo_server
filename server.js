const express = require("express");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

// Server configuration
app.enable("trust proxy");
app.disable("x-powered-by");
app.use(expressFileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Route management
const router = require("./src/routes/router");
app.use("/api/v1/", router);

// Global middleware express
app.use("*", function (req, res) {
  return res.send({
    status: 404,
    error: {
      message: "Oops!",
      details: "Page not found",
    },
    data: [],
  });
});

app.listen(port, () => console.log(`Sever running on port ${port}!`));

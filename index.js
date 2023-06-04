const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { profileValidator } = require("./custom-validation");
const { validationResult } = require("express-validator");

app = express();

app.use([morgan("dev"), cors(), express.json()]);

app.get("/", (req, res, next) => {
  return res.status(200).json({ message: "ok" });
});

app.post("/", profileValidator, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return {
        [error.path]: error.msg,
      };
    });

    return res.status(400).json({ errors: formattedErrors });
  }
  return res.status(201).json(req.body);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

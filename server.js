import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const CLIENT_ID = "5e5827589bb8bfaf633b";
const CLIENT_SECRET = "deb852824f59d9e8aef587d44de868353f7bd345";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Code being passed from FE
app.get("/getAccessToken", async (req, res) => {
  console.log(req.query.code);

  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// getUserData
// accessToken is going to be passed as an Authorization header
app.get("/getUserData", async (req, res) => {
  req.get("Authorization"); // Bearer accessToken
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("getAuthorization"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

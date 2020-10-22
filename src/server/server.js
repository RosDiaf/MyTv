const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

// Modules
const tvGuide = require("./modules/tv-guide-module");

// Data
const channelsDataSource = require("../assets/data/channels.json");

// Vars
let tvGuideList = [];

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ express: "Hello From Express Server Default Page" });
});

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

// app.post("/api/world", (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });


// -- Get TV Guide
async function getTvGuideByOne() {
  await tvGuide.getTVGuideRAI1().then((result) => {
    console.log("tvGuideList: ", result)
    tvGuideList.push(result);
  });
}
getTvGuideByOne();
// -- End


app.get("/api/channels", (req, res) => {
  res.send({
    tvGuideList: tvGuideList
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));

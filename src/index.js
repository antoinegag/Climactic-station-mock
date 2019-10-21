const args = require("yargs")
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging"
  })
  .option("port", {
    required: true,
    alias: "p",
    type: "number",
    description:
      "Port to start the mock station on. If multiple stations are defined this will be the first port used then it will be incremented by 1 every time"
  })
  .option("count", {
    default: 1,
    alias: "c",
    type: "number",
    description: "Number of mock station instances to start"
  }).argv;

const express = require("express");
const app = express();
const port = args.port;

function randomDouble(min, max) {
  return Math.floor(Math.random() * max) + min + Math.random();
}

app.get("/data", (req, res) =>
  res.json({
    temp: randomDouble(18, 25).toFixed(2),
    humidity: randomDouble(20, 60).toFixed(2),
    pressure: randomDouble(99000, 100000).toFixed(2)
  })
);

app.get("/climactic-station-node", (req, res) =>
  res.json({ "climactic-station-node": true })
);

app.get("/beep", (req, res) => {
  if (args.verbose) {
    console.info(`beep`);
  }

  return res.json({ error: null });
});

app.get("/dbeep", (req, res) => {
  if (args.verbose) {
    console.info(`beep beep`);
  }

  return res.json({ error: null });
});

for (let i = 0; i < args.count; i++) {
  app.listen(port + i);
  if (args.verbose) {
    console.info(`Listening on port ${port + i}`);
  }
}

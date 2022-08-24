const express = require("express");
const app = express();
const firebase = require("./firebase/config");
const db = firebase.firestore();

app.use(express.json());
const getPromise = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Promise resolved for ${time}s`);
    }, time);
  });
};

const main = async () => {
  const myPromiseArray = [getPromise(1000), getPromise(500), getPromise(3000)];
  console.log("Before For Each Loop");
  let d = "test";
  await Promise.all(myPromiseArray.map(async (element, index) => {
    // return "test";
    console.log(await element);
    await element.then((e) => {
      d = e;
    });
    // return await result
  }));

  console.log("After For Each Loop");
  return d;
};

app.post("/gettrip", async (req, res) => {
  let r = await main();
  res.send(r);
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/");
});

const express = require("express");
const app = express();
const firebase = require("./firebase/config");
const db = firebase.firestore();
app.use(express.json());
app.post("/gettrip", async (req, res) => {
  const sl = req.body.StartLocation;
  const users = await db.collection("users").get();
  let docs = []; 
  let subset = [];
  let dat = [];
  await users.forEach(async (doc) => { 
    docs.push(doc.id);
  });
  await Promise.all(
    docs.map(async (doc, idx) => {
      return new Promise(async (resolve, reject) => {
        const sub = await db
          .collection("users")
          .doc(doc)
          .collection("trips")
          .where("StartLocation", "==", sl)
          .get();
        await sub.forEach(async (s) => {
          await subset.push(s.id); 
          dat.push({ doc: doc, subcoll: s.id, data: s.data() });
        });
        resolve(subset);
      });
    })
  );
  res.json(dat); 
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/");
});

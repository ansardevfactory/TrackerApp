const express = require("express");
const app = express();
const firebase = require("./firebase/config");
const db = firebase.firestore();

app.use(express.json());
app.get("/getsummary", async (req, res) => {
  const users = await db
    .collection("users")
    .where("username", "==", "abc@email.com")
    .get();
  let dat = "";
  await users.forEach(async (doc) => {
    const sub = await db
      .collection("users")
      .doc(doc.id)
      .collection("summary")
      .where("TotalTripDistance", "==", "500")
      .get();
    dat = JSON.stringify(sub);
    sub.forEach((e) => console.log(e.id + "=>" + JSON.stringify(e.data())));
  });
  res.send(dat + "");
});
app.post("/gettrip", async (req, res) => {
  const sl = req.body.StartLocation;
  const dat = await myFunction(sl);
  res.send(JSON.stringify(dat) + "");
});
const callFunction = (sl) => {
  return new Promise((resolve, reject) => {
    const users = db.collection("users").get();
    let dat = "";
    users.forEach(async (doc) => {
      const sub = db
        .collection("users")
        .doc(doc.id)
        .collection("trips")
        .where("StartLocation", "==", sl)
        .get();
      sub.forEach(async (e) => {
        console.log(doc.id + "=>" + e.id + "=>" + JSON.stringify(e.data()));
        dat += doc.id + "=>" + e.id + "=>" + JSON.stringify(e.data());
      });
    });
    resolve(dat);
  });
};

const myFunction = async (sl) => {
  const users = await db.collection("users").get();
  var dat = "";
//   for await (const doc of users){
    // users.reduce(async (doc) => {
  await users.forEach(async (doc) => {
    const sub = await db
      .collection("users")
      .doc(doc.id)
      .collection("trips")
      .where("StartLocation", "==", sl)
      .get(); 
    await sub.forEach(async (e) => {
      console.log(doc.id + "=>" + e.id + "=>" + JSON.stringify(e.data()));
      dat= doc.id + "=>" + e.id + "=>" + JSON.stringify(e.data());
    }); 
  });
  return dat;
};

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/");
});

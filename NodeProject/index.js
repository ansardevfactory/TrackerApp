const { query } = require("express");
const express = require("express");
const app = express();
const firebase = require("./firebase/config");
const db = firebase.firestore();
app.use(express.json()); 

app.post("/read",async (req, res)=>{  
  const users=await db.collectionGroup("trips").where("StartLocation","==","Kochi").get(); 
  const result=[]
  await users.forEach(doc => {
    result.push({docname:doc.ref.parent.parent.id, tripname: doc.ref.parent.id, data: doc.data()}) 
  });
  res.json(result)
})

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/");
});

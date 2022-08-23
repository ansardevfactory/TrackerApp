const express=require('express')
const app=express();
const firebase = require("./firebase/config");
const db = firebase.firestore();

app.use(express.json())
app.post("/getdata",async (req,res)=>{
    const users = await db.collection("abc@email.com").doc("trip_1").get();
    res.send(JSON.stringify(users) + "");
})
app.listen(8000, ()=>{
    console.log("Server is running on http://localhost:8000/")
})
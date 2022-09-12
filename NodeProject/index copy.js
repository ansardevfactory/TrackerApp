const express = require("express");
const app = express();
const firebase = require("./firebase/config");
const db = firebase.firestore();
app.use(express.json()); 

const fetchone=(username)=>{
  return new Promise(async(resolve, reject)=>{
    const users = await db.collection("users").doc(username).get();
    resolve(users)
  }) 
} 

const fetchtwo=(username)=>{
  return new Promise(async(resolve, reject)=>{
    const users = await db.collection("users").doc(username).get();
    resolve(users)
  }) 
} 

const fetchthree=(username)=>{
  return new Promise(async(resolve, reject)=>{
    const users = await db.collection("users").doc(username).get();
    resolve(users)
  }) 
} 

app.post("/firstpage", async (req, res) => {
  const result = [];
  const fetch =await new Promise(async (resolve, reject)=>{
    let one=await fetchone("abc@email.com")
    result.push(one)
    let two=await fetchtwo("newtest@email.com")
    result.push(two)
    let three=await fetchthree("newtest@email.com")
    result.push(three)
    resolve(result)
  }) 
  res.json(fetch);
}); 

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000/");
});

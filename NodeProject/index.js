const express=require('express')
const app=express();
app.get("/",(req,res)=>{
    console.log("Return from route'/'.")
    res.send("Return from route'/'.")
})
app.get("/newpath",(req,res)=>{
    console.log("Return from route'/newpath'.")
    res.send("Return from route'/newpath'.")
})
app.listen(8000, ()=>{
    console.log("Server is running on http://localhost:8000/")
})
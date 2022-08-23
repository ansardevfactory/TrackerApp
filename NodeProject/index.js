const express=require('express')
const app=express();
app.use(express.json())
app.post("/withparameter",(req,res)=>{
    const parameterone=req.body.parameterone;
    const parametertwo=req.body.parametertwo;
    res.send("ParameterOne= "+parameterone+"& ParameterTwo="+parametertwo)
})
app.listen(8000, ()=>{
    console.log("Server is running on http://localhost:8000/")
})
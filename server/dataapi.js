
const express=require("express");
const app=express();
app.use(express.json());
const server=app.listen(4000,()=>{console.log("running at port 4000")});
app.post('/api',(req,res)=>{
    res.send(JSON.parse(req.body));
    console.log("Hello api")});
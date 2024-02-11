const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

let cars = [{id:"1",model:'BMW',license_number:1457}];
let lastIndex = cars.length;
app.get("/cars/showone",function(req,res){
    const cid = req.query.id;
    const car = cars.find(car => car.id == cid);
    const body ={
        data:car
    }
    if(car){
        body.msg = 'success';
    }else{
        body.msg = 'failed';
    }
    res.send(body);
});

app.get("/cars/showall",function(req,res){
    res.send({data:cars,msg:"success"});
});

app.post("/cars/add",function(req,res){
    const car = req.body;
    car.id = String(++lastIndex);
    cars.push(car);
    const body ={
        msg:"success"
    }
    res.send(body);
});

app.get("/cars/delete/:id",function(req,res){
    const cid = req.params.id;
    const carIndex = cars.findIndex(car => car.id==cid );
    const body = {};
    if(carIndex >= 0){
        cars.splice(carIndex,1);
        body.msg="Success";
    }else{
        body.msg="Not Found";
    }
    
    res.send(body)
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.listen(8080);
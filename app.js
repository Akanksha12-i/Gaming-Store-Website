const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const encrypt=require('mongoose-encryption');
const mongoose =require('mongoose');

var app=express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public')); // this shows that all static files are placed in the public folder...



mongoose.connect("mongodb://127.0.0.1:27017/Gamestore"); //--> connecting with mongoose here..


const proSchema =new mongoose.Schema({
    imagePath:{type:String,required:true},
    title:{type:String,required:true},
    price:{type:Number,required:true}
});

const trySchema = new mongoose.Schema({
name:{type:String,require:true},
email:{type:String,require:true},
password:{type:String,require:true},
});


//Encryption done here...----->Written below schema
const sec="thisislittlesecret";
trySchema.plugin(encrypt,{secret:sec,encryptedFields:["password"]});

const item=mongoose.model("seconds",trySchema);

const Product=mongoose.model("products",proSchema);
//module.exports=Product;

var products= [
    
new Product({
    imagePath:'/img/eotb2.jpg',
    title:'Eye of Beholder 2',
    price:300
}),
new Product({
    imagePath:'/img/call.jpeg',
    title:'Call of Duty',
    price:350
}),
new Product({
    imagePath:'/img/castlefall.jpg',
    title:'Castle Fall',
    price:200
}),
new Product({
    imagePath:'/img/Darkness.jpg',
    title:'Darkness And Flame',
    price:900
}),
new Product({
    imagePath:'/img/dark-souls.jpg',
    title:'Dark Souls 2',
    price:1150
}),
new Product({
    imagePath:'/img/goldNblood.jpeg',
    title:'Gold N Blood',
    price:300
}),
new Product({
    imagePath:'/img/Hellwomb.jpg',
    title:'Hellwomb',
    price:800
})
];


//var done=0;


for(let i=0;i<products.length;i++){
    products[i].save();/*.then(()=>{
        done++;
        if(done===products.length){
            exit();
        }
    }).catch((err)=>{
        console.log(err);
    });*/
}
/*function exit(){
    mongoose.disconnect();
    }*/



    app.get("/",(req,res)=>{
        res.render("home");
    });

    app.post("/register",(req,res)=>{
        const foundUser= new item({  //--foundUser is the new User added...
            name:req.body.username,
            email: req.body.emailname,
            password: req.body.password
            });
            foundUser.save();
                    res.render("user",{foundUser});
                    
    });

    app.post("/login",(req,res)=>{
        const username=req.body.username;
        const password= req.body.password;
        
    
        item.findOne({email:username}).then(function(foundUser){  
               //    const pername=foundUser.name; --- this will show you the User name in console...                                     
                if(foundUser){                              
                    if(foundUser.password===password){
                        //console.log(pername);
                            res.render("user",{foundUser});
                         
                    }else{
                        res.send("<h1>Invalid Username or Password!!</h1>");
                    }
                }
            }).catch((err)=>{
            console.log(err);
        });
    });

    

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/register",(req,res)=>{
    res.render("register");
});



  
  app.post( "/user",function(req,res){
    const itemName= req.body.ele1; //Here ele1 is the (name:"") of the input
    Product.findOne({title:itemName}).then(function(foundItems){
        const ina=foundItems.title;
        const path=foundItems.imagePath;
        const prc=foundItems.price;
        if(foundItems){
       /* console.log(ina);
        console.log(path);
        console.log(prc);*/
        res.render("cart",{foundItems});
        }
     }).catch(function(err){
         console.log(err);
     });
  });
  
  
app.listen(8000,()=>{
    console.log("Server Started....");
});

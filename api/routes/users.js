var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");
  },
  filename:async(req,file,cb)=>{
    console.log(file);
    cb(null,Date.now()+path.extname(file.originalname));
  },
});
const upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async(req, res, next)=> {
  const users = await User.findOne({email:req.body.email});
  if(users) return  res.json({message:"Account already exist",type:'error'});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password,salt);
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword,
  });
  try{
    const postUser = await user.save();
    res.json(postUser);
  }catch(err){
    res.json({message:err});
  }
});


router.post('/login', async(req, res, next)=> {
  const user = await User.findOne({email:req.body.email});
  if(!user) return  res.json({message:"Email doesnot exist"});
  const validPass = await bcrypt.compare(req.body.password,user.password);
  if(!validPass) return res.json({message:"Invalid password"});
  const token = jwt.sign(user.toJSON(), 'fahimsarat44885');
  res.json({user:user,token:token});
});

router.post('/verify', async(req, res, next)=> {
  try{
    var decoded = jwt.verify(req.body.token, 'fahimsarat44885');
    res.json({user:decoded});
  }catch(err){
    res.json({error:"Invalid token"});
  }
  
});

router.get('/get/:email', async(req, res, next)=> {
  const user = await User.findOne({email:req.params.email});
  return res.json({user:user});
});

router.post('/update/dp/',upload.single('image'), async(req, res, next)=> {
  const user = await User.findOne({email:req.body.email});
  const investor = await User.updateOne({email:req.body.email},{$set:{profile_picture:req.file.filename}});
  return res.json({user:user});
});

router.put('/update/profile/', async(req, res, next)=> {
  const investor = await User.updateMany({email:req.body.email},{$set:{name:req.body.name,nid:req.body.nid}});
  return res.json({message:"Profile updated"});
});



router.post('/update/business/profile', async(req, res, next)=> {
  const updatedValue = await User.updateMany({email:req.body.userMail},{$set:{
    businessName:req.body.businessName,
    currentValuation:req.body.currentValuation,
    lastMonthEarning:req.body.lastMonthEarning,
    netProfit:req.body.netProfit,
    milestone1:req.body.milestone1,
    milestone2:req.body.milestone2,
    milestone3:req.body.milestone3,
    milestone4:req.body.milestone4,
    milestone5:req.body.milestone5,
    A:req.body.A,
    angel:req.body.angel,
    B:req.body.B,
    C:req.body.C,
    seed:req.body.seed,
    preSeed:req.body.preSeed,
  }});
  return res.json({"values":req.body.businessName});
});
module.exports = router;

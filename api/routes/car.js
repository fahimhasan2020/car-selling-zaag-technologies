var express = require('express');
var router = express.Router();
const Car = require('../models/Car');

/* GET home page. */
router.get('/', async(req, res, next)=> {
  const car =  await Car.find();
  res.json(car);
});
router.post('/personal', async(req, res, next)=> {
  const car =  await Car.find({user:req.body.user});
  res.json(car);
});
router.post('/findone', async(req, res, next)=> {
  const car =  await Car.findById(req.body.id);
  res.json(car);
});
router.post('/delete', async(req, res, next)=> {
    const deleteCar = await Car.remove({_id:req.body.id});
    res.json({"message":"Successfully deleted"});
});

router.post('/', async(req, res, next)=> {
    const car = new Car({
      name:req.body.name,
      brand:req.body.brand,
      price:req.body.price,
      user:req.body.user,
      details:req.body.details
    });
    try{
      const postCar = await car.save();
      res.json(postCar);
    }catch(err){
      res.json({message:err});
    }
  });

module.exports = router;
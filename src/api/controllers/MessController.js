const httpStatus = require('http-status');
const catchAsync = require('../utils/CatchAsync');
const messService  = require('../services/MessService');
const mess = require("../models/mess");

const getMessDetails = catchAsync(async (req, res) => {
    const data = await  mess.findAll();
    res.send(data);
});

const createMess = catchAsync(async (req, res) => {
    console.log(req.body)
    const messData = await mess.findOne({ where: { messId: req.body.messId } });
    if(messData==null){
        const body = req.body;
        const data = await mess.create({
            name: body.name,
            messId: body.messId,
            description: body.description,
            isVeg: body.isVeg,
            capacity: body.capacity,
            boyCapacity: body.boyCapacity,
            girlCapacity: body.girlCapacity,
            menu: body.menu,
            charges: body.charges
        });
        res.send(data);
    }else{
        res.status(401).json({
            message: "mess with that already exits",
        });
    }
});

const getMessDetailsByName = catchAsync(async (req, res) => {
    const data = await  mess.findOne({ where: { name: req.params.name } });
    res.send(data);
});

const getMessDetailsByMessId = catchAsync(async (req, res) => {
    const data = await  mess.findOne({ where: { messId: req.params.messId } });
    res.send(data);
});

const updateMessDetails = catchAsync(async (req, res) => {
    const body=req.body;
    const data = await mess.update(
        {
            name: body.name,
            description: body.description,
            isVeg: body.isVeg,
            capacity: body.capacity,
            boyCapacity: body.boyCapacity,
            girlCapacity: body.girlCapacity,
            menu: body.menu,
            charges: body.charges
        },
        { where: { messId: body.messId } }
    )
    res.send(data);
});


module.exports = {
  getMessDetails,
  getMessDetailsByMessId,
  getMessDetailsByName,
  updateMessDetails,
  createMess
};
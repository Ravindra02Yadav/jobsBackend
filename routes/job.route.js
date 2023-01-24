const express = require('express');
const {JobModel} = require('../modals/job.model')
const JobRouter = express.Router();

JobRouter.get('/', async (req, res)=> {
    let data = await JobModel.find({})
    console.log(data)
    res.send(data);
})
JobRouter.post('/create',(req,  res)=>{
    let job = new JobModel(req.body)
    job.save();
    res.send({msg:'Job Created Successfull'});
})
JobRouter.delete('/delete' , async (req, res)=>{
    let { Id } = req.body;
    let job = await JobModel.findOne({Id})
    console.log(job);
    if(job ?._id){
        let updated = await BugModel.findByIdAndDelete(job._id, (err, data) =>
        {
            if(err){
                console.log(err)
            }
            console.log("done : "+data);
            res.send("Job deleted")
        });
    }else {
        res.status(404).send({err:"Job Not Found"})
    }
})
JobRouter.patch("/update",async(req, res)=> {
    let { Id,type } = req.body;
    let isPresent = await JobModel.findOne({ Id })
    if(isPresent?._id){
       isPresent.type = req.type;
       isPresent.save();
       res.send("Updated");
    }else {
        res.send("Job Not Available");
    }
})

module.exports = { JobRouter };
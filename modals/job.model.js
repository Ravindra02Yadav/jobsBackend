const mongoose = require('mongoose');

const JobModel = mongoose.model('jobs', {
    Id:Number,
    company:String,
    postion:String,
    contract:Number,
    location:String

});
module.exports = { JobModel };
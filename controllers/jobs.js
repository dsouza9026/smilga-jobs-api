const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const { user:{userId}, params: {id: jobId} } = req
    const job = await Job.findOne({
        _id:jobId,
        createdBy: userId
    })
    if(!job){
        throw new NotFoundError(`No job with Id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const updateJob = async (req, res) => {
    const { 
        user:{userId}, 
        params: {id: jobId},
        body:{company, position} 
    } = req

    if(company == '' || position == ''){
        throw new BadRequestError("Company or Position fields cannot be empty.")
    }

    const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true})

    if(!job){
        throw new NotFoundError(`No job with Id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})

}

const deleteJob = async (req, res) => {
    const { 
        user:{userId}, 
        params: {id: jobId} 
    } = req

    const job = await Job.findByIdAndDelete({
        _id:jobId,
        createdBy: userId
    })

    if(!job){
        throw new NotFoundError(`No job with Id ${jobId}`)
    }
    
    res.status(StatusCodes.OK).json({job})

}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}
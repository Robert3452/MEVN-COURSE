const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id',async(req,res)=>{
    const task = await Task.findById(req.params.id);
    console.log(task);
    res.json(task);
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    // console.log(task);
    await task.save();
    res.json({ status: 'Task saved' });

});

router.put('/:id',async(req,res)=>{
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status :"task updated"
    });
});

router.delete('/:id',async(req,res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status:"Task deleted"
    });
});


module.exports = router;
const Task = require('../models/task');
const { TokenExpiredError } = require('jsonwebtoken');

const getTaskById = (req, res) => {

}

const getTasks = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 20;   
    try{
        let tasks = await Task.find().sort({"_id": -1}).skip((page - 1) * limit).limit(limit);
        let documents = await Task.count();
        let totalPages = Math.ceil(documents/limit)
        res.json({
            totalResults: documents,
            limit: limit,
            page: page,
            totalPages: totalPages,
            hasPreviousPage: page > 1 ? true : false,
            hasNextPage: page < totalPages ? true : false,
            prevPage: page > 1 ?  page - 1 : 1,
            nextPage: page < totalPages ? page + 1 : totalPages,
            results: tasks 
        });
    }catch(error){
        res.status(400).json({
            message: "No se han podido obtener las tareas"
        })
    }    
}

const saveTask = async (req, res) => {
    const {content, date, is_completed, categories} = req.body;
    let newTask = new Task({user_id: 1, content, date: new Date(date), is_completed: false, categories: []});
    try{
        await newTask.save();
        res.status(201).json({
            message: "La tarea se ha agregado correctamente en el sistema",
        });
    }catch(error){
        console.log(error);        
        res.status(400).json({
            message: "Hubo un error al agregar la tarea en el sistema"
        });
    }
}

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try{
        let results = await Task.deleteOne({_id: id});
        if(results.deletedCount >= 1){
            return res.status(200).json({
                message: "La tarea ha sido eliminada correctamente"
            })
        }else{
            return res.status(200).json({
                message: "No se ha eliminado ninguna tarea"
            })
        }
    }catch(error){
        res.status(400).json({
            message: "Hubo un error al tratar de eliminar la tarea del sistema"
        })
    }
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    const {content, date} = req.body;
    const is_completed = req.body.is_completed ? true : false;
    try{
        let results = await Task.updateOne({_id: id}, {content, date, is_completed});
        if(results.nModified >= 1){
            return res.status(200).json({
                message: "La tarea ha actualizada correctamente"
            })
        }else{
            return res.status(200).json({
                message: "No se ha actualizado ninguna tarea"
            })
        }
    }catch(error){
        res.status(400).json({
            message: "Hubo un error al tratar de actualizar la tarea del sistema"
        })
    }
}

module.exports = {
    getTaskById,
    getTasks,
    saveTask,
    deleteTask,
    updateTask
}
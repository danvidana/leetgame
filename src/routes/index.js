const express = require('express');
const router = express.Router();
const GameRecord = require('../model/gameRecord');
const db = require("../database");
const config = require('../config');

// Nos regresaria las tareas guardadas en la BD
router.get('/', async (req,res) =>{
const gameRecords = await GameRecord.find();
res.render('index', {gameRecords});
});

router.get('/new-game',   async(req,res) =>{
    res.render('new-game');
})

router.get('/login',   async(req,res) =>{
    res.render('login-signing');
})


// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post
router.post('/add', async (req,res) =>{
const gameRecords = new GameRecord(req.body);
await GameRecords.save();
res.redirect('/');
});

// Ruta para editar los datos

router.get('/edit/:id',   async(req,res) =>{
const gameRecord = await GameRecord.findById(req.params.id);
res.render('edit', {gameRecord});
})


// Ruta para actualizar los datos

router.post('/edit/:id',   async(req,res) =>{
    var  id = req.params.id;
    await GameRecord.update({_id: id}, req.body);
    res.redirect('/');
    })


// Ruta que nos permita eliminar tareas

router.get('/delete/:id',  async (req,res) =>{
    var id = req.params.id;
    await GameRecord.remove({_id: id});
    res.redirect('/');
})








module.exports = router;
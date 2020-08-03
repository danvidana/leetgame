const express = require('express');
const router = express.Router();
const GameRecord = require('../model/gameRecord');
const db = require('../database');

// Ruta inicial a pantalla para hacer login o sign in
router.get('/', (req,res) =>{
    res.render('login'); 
});

// Ruta de home donde se ven los gameRecords del usuario
router.get('/home',   async(req,res) =>{
    const gameRecords = await GameRecord.find();
    res.render('home', {gameRecords}); 
})

router.get('/new-game', (req,res) =>{
    res.render('new-game');
})

router.get('/game-continue/:id', async (req,res) =>{
    const gameRecord = await GameRecord.findById(req.params.id);
    res.render('game-continue', {gameRecord});
})

// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post
router.post('/add', async (req,res) =>{
    const gameRecord = new GameRecord(req.body);
    await gameRecord.save();
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


// Ruta que nos permita eliminar gameRecords
router.get('/delete/:id',  async (req,res) =>{
    var id = req.params.id;
    await GameRecord.remove({_id: id});
    res.redirect('/');
})

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
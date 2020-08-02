const express = require('express');
const router = express.Router();
const GameRecord = require('../model/gameRecord');
<<<<<<< HEAD
const db = require("../database");
const config = require('../config');
=======
//const db = require("./database");
>>>>>>> master

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


<<<<<<< HEAD
=======
/*
router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});
*/
>>>>>>> master



<<<<<<< HEAD
=======
/*
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
*/
>>>>>>> master



module.exports = router;
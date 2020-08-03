const express = require('express');
const router = express.Router();
const GameRecord = require('../model/gameRecord');
const jwt = require("jsonwebtoken");
const config = require('../config');

const db = require('../database');
const verifyToken = require('../controllers/verifyToken');

function secondsToTime(seconds) {
    var timePlayed = new Date(0);
    timePlayed.setSeconds(seconds); // specify value for SECONDS here
    var timeString = timePlayed.toISOString().substr(11, 8);
    return timeString;
}

// Ruta inicial a pantalla para hacer login o sign in
router.get('/', (req,res) =>{
    res.render('login'); 
});

// Ruta de home donde se ven los gameRecords del usuario
router.get('/home', verifyToken, async(req,res) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,config.secret)
    id = decoded.id;
    var timesFormated = [];
    const gameRecords = await GameRecord.find({userId: id});
    for (var i = 0; i < gameRecords.length; i++) {
        timesFormated.push(secondsToTime(gameRecords[i].timePlayed));
    }
    res.render('home', {gameRecords, timesFormated}); 
})

router.get('/new-game', verifyToken, async (req,res) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,config.secret)
    id = decoded.id;
    const gameRecords = await GameRecord.find({userId: id});
    res.render('new-game', {gameRecords});
})

router.get('/game-continue/:id', verifyToken, async (req,res) =>{const token = req.cookies.token;
    const decoded = jwt.verify(token,config.secret)
    id = decoded.id;
    const gameRecords = await GameRecord.find({userId: id});
    const gameRecord = await GameRecord.findById(req.params.id);
    var timeString = secondsToTime(gameRecord.timePlayed);
    res.render('game-continue', {gameRecord, gameRecords, timeString});
})

// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post
router.post('/add-game', verifyToken, async (req,res) =>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,config.secret)
    var id = decoded.id;
    const gameRecord = new GameRecord(req.body);
    gameRecord.userId = id;
    gameRecord.timePlayed = 0;
    gameRecord.estimatedCompletionTime = parseInt(req.body.estimatedCompletionTime)  * 360;
    gameRecord.dateStarted = new Date();
    await gameRecord.save();
    res.redirect('/home');
});

// Ruta para guardar el tiempo jugado de una sesion
router.get('/saveTime/:id/:time', async (req,res) =>{
    const gameRecord = await GameRecord.findById(req.params.id);
    gameRecord.timePlayed = parseInt(gameRecord.timePlayed) + parseInt(req.params.time);
    gameRecord.lastPlayed = new Date();
    await gameRecord.save();
    res.redirect('/home');
})

/*
router.post('/saveTime/:time', async(req,res) => {
    const gameRecord = await 
})
*/


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

//login and signup
router.get('/register', (req, res) => {
    res.render('register', {});
});

router.post('/add', async (req,res) =>{
    const gameRecord = new GameRecord(req.body);
    await gameRecord.save();
    res.redirect('/');
});

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

/*
router.get('/login', (req, res) => {
    res.render('home', { user : req.user, error : req.flash('error')});
});
*/

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



module.exports = router;
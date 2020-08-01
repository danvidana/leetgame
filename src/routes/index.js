const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const db = require("./database");

// Nos regresaria las tareas guardadas en la BD
router.get('/', async (req,res) =>{
const tasks = await Task.find();
res.render('index', {tasks});
});

router.get('/new-game',   async(req,res) =>{
    res.render('new-game');
    })


// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post
router.post('/add', async (req,res) =>{
const task = new Task(req.body);
await task.save();
res.redirect('/');
});

// Ruta para editar los datos

router.get('/edit/:id',   async(req,res) =>{
const task = await Task.findById(req.params.id);
res.render('edit', {task});
})


// Ruta para actualizar los datos

router.post('/edit/:id',   async(req,res) =>{
    var  id = req.params.id;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
    })


// Ruta que nos permita eliminar tareas

router.get('/delete/:id',  async (req,res) =>{
    var id = req.params.id;
    await Task.remove({_id: id});
    res.redirect('/');
})

//login and signup
router.get('/register', (req, res) => {
    res.render('register', { });
});

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


router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

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
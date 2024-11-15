const express = require('express');
const router = express.Router();
const Mailgun = require('mailgun-js');
const Item = require('../models/Item');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


const randomString = (length) => {
    let text = ''
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i=0; i<length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

router.get('/', (req, res, next) => {
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }

    Item.find(null)
    .then(items => {

        Item.find({interested: user._id})
        .then(interestedItems => {
            const data = {
                user: user,
                items: items,
                interested: interestedItems
            }

            res.render('account', data)
        })
        .catch(err => {
            return next(err)
        })
    })
    .catch(err => {
        return next(err)
    })
})

router.get('/additem/:itemid', (req, res, next) => {
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }
    const info = req.params.itemid;
    Item.findById(info)
    .then(item => {
        if(item.interested.indexOf(user._id) == -1){
            item.interested.push(user._id)
            item.save()
            res.redirect('/account')
        }
    })
    .catch(err => {
        return next(err)
    })
})

router.get('/removeitem/:itemid', (req, res, next) => {
    const user = req.user
    if(user == null){
        res.redirect('/')
        return
    }
    const info = req.params.itemid;
    Item.findById(info)
    .then(item => {
        if(item.interested.indexOf(user._id) != -1){
            item.interested.remove(user._id)
            item.save()
            res.redirect('/account')
        }
    })
    .catch(err => {
        return next(err)
    })
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')    
       
    })
     
})


router.post('/resetpassword', (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        user.nonce = randomString(8)
        user.passwordResetTime = new Date()
        user.save()

        const mailgun = Mailgun({
            apiKey: 'f053a7466f75c98a9943226ec8c7e2cb-3724298e-23ca873e',
            domain: 'sandbox3a3880af404641ad950a2b24f24de6fa.mailgun.org'
        })

        const data = {
            to: req.body.email,
            from: 'jasonluyk@gmail.com',
            sender: 'Sample Store',
            subject: 'Password Reset Request',
            html: 'Please click <a style="color:red" href="http://localhost:5000/account/password-reset?nonce='+user.nonce+'&id='+user._id+'">HERE</a> to reset your password. This link is valid for 24 hours.'
        }
        
        mailgun.messages().send(data, (err, body) => {
            if(err)
                return next(err)

            //Success
            res.redirect('/reset')
            // res.json({
            //     confirmation: 'success',
            //     data: 'reset password endpoint',
            //     user: user
            //   })
        })

        
    })
    .catch(err => {
        return next(err)
    })
})

router.get('/password-reset', (req, res, next) => {
    const nonce = req.query.nonce 
    if (nonce == null){
        return next(new Error('Invalid Request'))
    }
    const user_id = req.query.id
    if (user_id == null){
        return next(new Error('Invalid Request'))
    }

    User.findById(user_id)
    .then(user => {
        const now = new Date()
        const diff = now - user.passwordResetTime
        const seconds = diff/1000
        if(seconds > 24*60*60){
            return next(new Error('Invalid Request'))
        }

        const data ={
            id: user_id,
            nonce: nonce
        }
        res.render('password-reset', data)
    
    })
    .catch(err => {
        if(user.passwordResetTime == null){
            return next(new Error('Invalid Request'))
        }
        if(user.nonce == null){
            return next(new Error('Invalid Request'))
        }
        if(nonce != user.nonce){
            return next(new Error('Invalid Request'))
        }        
        return next(new Error('Invalid Request'))
    })
})

router.post('/newpassword', (req, res, next) => {
    const password1 = req.body.password1
    if (password1.length == 0){
        return next(new Error('Invalid Request'))
    }
    const password2 = req.body.password2
    if (password2.length == 0){
        return next(new Error('Invalid Request'))
    }
    const nonce = req.body.nonce
    if (nonce.length != 8){
        return next(new Error('Invalid Rquest'))
    }
    const user_id = req.body.id
    if (user_id.length == 0){
        return next(new Error('Invalid Request'))
    }
    
    if (password1 != password2){
        return next(new Error('Passwords do no match'))
    }

    User.findById(user_id)
    .then(user => {
        const now = new Date()
        const diff = now - user.passwordResetTime
        const seconds = diff/1000
        if(seconds > 24*60*60){
            return next(new Error('Invalid Request'))
        }
        const hashedPw = bcrypt.hashSync(password1, 10)
        user.password = hashedPw
        user.save()

        res.redirect('/')
    })
    .catch(err => {
        if(user.passwordResetTime == null){
            return next(new Error('Invalid Request'))
        }
        if(user.nonce == null){
            return next(new Error('Invalid Request'))
        }
        if(nonce != user.nonce){
            return next(new Error('Invalid Request'))
        }        
        return next(err)
    })
    
})



module.exports = router
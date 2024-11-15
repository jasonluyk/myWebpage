import { Router } from 'express';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { secret, auth } from '../../config/passport';
const router = Router();

router.get('/', auth, (req, res) => {
    User.find({}).select('-password').exec()
    .then(users => {
        return res.send(users)
    })
    .catch(err => {
        return res.status(500).send(err)
    })
    
});

router.get('/:id', auth, (req, res) => {
    const { id } = req.params;
    User.findById(id).select('-password').exec()
    .then(userModel => {
        return res.send(userModel)
    })
    .catch(err => {
        return res.status(400).send ({ err })
    })
})

router.post('/token', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ err: `Required Fields not Found: ${!username ? 'username' : ''} ${!password ? 'password' : ''}`})
    }

    User.findOne({ username: username })
        .then(userModel => {
            if(!userModel) return res.status(400).send({ err: 'Cannot find user' });
            return userModel.comparePassword(password, function(err, isMatch) {
                if(err) return res.status(400).send(err);

                if(!isMatch) {
                    return res.status(401).send({ err: 'Invalid Password'});
                }
                const payload = {id: userModel._id};
                const token = jwt.sign(payload, secret)
                return res.send(token);
            })
            
        })
        .catch(err => {
             
            return res.status(401).send(err);
        })        
    });

router.patch('/', auth, (req, res) => {
    const { password } = req.body;
    if(!password) {
        return res.status(400).send({ err: 'Password is Required'})
    }

    const currentUser = req.user;
    currentUser.password = password;
    currentUser.save()
    .then(saved => {
        return res.status(204).send({ saved: 'Password updated' })
    })
    .catch(err => {
        return res.status(400).send({ err })
    })
})

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ err: `Required Fields not Found: ${!username ? 'username' : ''} ${!password ? 'password' : ''}`})
    }
    const newUser = new User({
        username: username,
        password: password
    });
    return newUser.save() 
    .then(model => {
        return res.status(201).send(model.removePass());
    })
    .catch(err => {
        return res.status(400).send({ err });
    })   
    });


router.get('/current', auth, (req, res) => {
    return res.send(req.user);
})
export default router;
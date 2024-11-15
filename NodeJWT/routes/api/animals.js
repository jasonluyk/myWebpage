import { Router } from 'express';
import { auth } from '../../config/passport';
import Animal from '../../models/Animal';
import User from '../../models/User';

const router = Router();

router.get('/', auth, (req, res) => {
    Animal.find({})
    .then(animalModels => {
       return res.send(animalModels) 
    })
    .catch(err => {
        return res.status(400).send ({ err })
    })
})


router.post('/', auth, (req, res) => {
    const { type, name } = req.body;
    if(!type || !name) {
        return res.status(400).send('Type and Name are Required');
    }

    const newAnimal = new Animal({
        name: name,
        type: type,
        owner: req.user._id
    });

    return newAnimal.save()
    .then(savedAnimal => {
        User.findByIdAndUpdate(req.user._id, { $push: { animals: savedAnimal._id}})
        return res.send(savedAnimal)
        })
    
    
    .catch(err => {
        return res.status(400).send ({ err });
    })
})

router.delete('/:id', auth, (req, res) => {
    const { id } = req.params;
    Animal.deleteOne({_id: id })
    .then(complete => {
        return res.status(204).send({ complete: 'Success'})
    })
    .catch(err => {
        return res.status(400).send ({ err })
    })
    
    
});

router.put('/:id', auth, (req, res) => {
    const { id } = req.params;
    const { name, type, owner } = req.body;

    if(!name || !type) {
        return res.status(400).send({ err: 'Name and Type are Required'})
    };

    Animal.findByIdAndUpdate(id, {name: name, type: type, owner: owner}, { new: true })
    .then(updatedAnimal => {
        return res.send(updatedAnimal)
    })
    .catch(err => {
        return res.status(400).send({ err })
    })
});

router.patch('/:id', auth, (req, res) => {
    const { id } = req.params;
    const { name, type, owner } = req.body;

    if(!name || !type) {
        return res.status(400).send({ err: 'Name and Type are Required'})
    };

    const updated = { name: name, type: type};
    if(owner){
        updated.owner = owner;
    };
    Animal.findByIdAndUpdate(id, updated, { new: true })
    .then(updatedAnimal => {
        return res.send(updatedAnimal)
    })
    .catch(err => {
        return res.status(400).send({ err })
    })
})

export default router;
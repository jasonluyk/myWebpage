import express from 'express';

import apiRoutes from './routes/api';




const app = new express();
app.use(express.urlencoded({
    extended: false
}));

app.use('/api', apiRoutes);



app.get('/', (req, res) => {
    return res.send('Hello World')
})


    


app.listen(process.env.PORT || 3000);
console.log('Server is running')
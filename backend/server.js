import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send ('server started')
})

//   /api is standerd practice
app.get('/api/jokes' , (req, res) => {
    const jokes =[
        {
            id : 1,
            title : 'joke1',
            content : 'this is a first joke'
        },
        {
            id : 2,
            title : 'joke2',
            content : 'this is a second joke'
        },
        {
            id : 3,
            title : 'joke3',
            content : 'this is a third joke'
        },
        {
            id : 4,
            title : 'joke4',
            content : 'this is a fourth joke'
        },
        {
            id : 5,
            title : 'joke5',
            content : 'this is a fifth joke'
        }
    ]
    res.send(jokes)
})

const port = process.env.PORT || 5000

app.listen(port , () =>{
    console.log(`server is running on port ${port}`)
})
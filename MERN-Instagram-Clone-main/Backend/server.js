import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import dbModel from './dbModel.js'

// app config
const app = express();
const port = process.env.PORT;


// middlewares
app.use(express.json())
app.use(cors())


// pusher config
const pusher = new Pusher({
    appId: '1085111',
    key: '1b5db95740efca43804f',
    secret: 'd10593aa696f0379a22e',
    cluster: 'ap2',
    useTLS: true
});


// DB config
const connection_url = 'mongodb+srv://admin:1Fx7Kjd7elHhbetJ@cluster0.rlzq1.mongodb.net/instaDB?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', change => {
        if (change.operationType === 'insert') {

            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                username: postDetails.username,
                caption: postDetails.caption,
                image: postDetails.image,
                comments: postDetails.comments
            })

        } else if (change.operationType === 'update') {

            const postDetails = change.updateDescription.updatedFields;

            pusher.trigger('posts', 'updated', {
                comments: postDetails.comments
            })

        }
    })
})


// api route
app.get('/', (req, res) => {
    res.status(200).send("Instagram Backend")
});

app.post('/upload', (req, res) => {
    const body = req.body;
    dbModel.create(body, (error, data) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(201).send(data)
        }
    })
});

app.post('/upload/:docId', (req, res) => {
    const body = req.body;
    const docId = req.params.docId;
    dbModel.updateOne(
        { _id: docId },
        { $addToSet: { comments: { $each: [body] } } },
        (error, data) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.status(201).send(data)
            }
        })
});

app.get('/sync', (req, res) => {
    dbModel.find((error, data) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(data)
        }
    })
})


// app listener
app.listen(port,
    // console.log(`Server is Up ${PORT}`)
)

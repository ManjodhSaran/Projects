import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import e from 'express';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1072023',
    key: '03e54f1777a051200b14',
    secret: '5181d8404bbcd5ea39d3',
    cluster: 'ap2',
    encrypted: true
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-control-Allow-Headers", "*");
    next();
});

const connection_url = "mongodb+srv://admin:GcZhoZxpQdbUyVvj@cluster0.hiu2l.mongodb.net/whatsappDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

db.once('open', () => {
    console.log("DB Connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log("a change" + change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.user,
                message: messageDetails.message,
            });
        } else {
            console.log("Error Triggerer")
        }

    })
})

app.get('/', (req, res) => {
    res.send("hello")
});

app.get('/api/v1/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});



app.listen(port, () => console.log(`Listening on Port ${port}`));
// GcZhoZxpQdbUyVvj
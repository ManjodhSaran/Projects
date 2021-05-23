import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
// import authenticateToken from '../middlewares/AuthenticateToken';


const router = express.Router();

router.route(`api/v1/users`)
    .get((req, res) => {
        userModel.find((error, data) => {
            if (error)
                res.status(500).send(error)
            else
                res.status(200).send(data)
        })
    })

    .post((req, res) => {
        var myobj = { name: req.body.name, email: req.body.email };
        userModel.create(myobj, (error, data) => {
            if (error)
                res.status(500).send(error)
            else
                res.status(200).send(data)
        });
    })

    .delete((req, res) => {
        userModel.deleteMany((error, data) => {
            if (error)
                res.status(500).send(error)
            else
                res.status(200).send(data)
        });
    })

export default router;
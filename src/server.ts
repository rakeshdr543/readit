import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from "morgan";

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send('Hello my reddit')
})

app.listen(5000,async ()=>{
    console.log("Server connected in 5000")
    try {
        await createConnection()
        console.log('DB Connected')
    }catch (e) {
        console.log(e)
    }
})


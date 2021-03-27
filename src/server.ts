import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config()

import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/subs'

import trim from "./middleware/trim";

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/',(_,res)=>{
    res.send('Hello my reddit')
})

app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/subs',subRoutes)


app.listen(5001,async ()=>{
    console.log("Server connected in 5000")
    try {
        await createConnection()
        console.log('DB Connected')
    }catch (e) {
        console.log(e)
    }
})


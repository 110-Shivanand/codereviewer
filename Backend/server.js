const express=require('express')
const server=express()
require('dotenv').config()
const router=require('./routes')
const cors=require('cors')
server.use(cors())
const router1 =require('./mailroute')

// console.log(process.env.GROQ_API_KEY)

 server.use(express.json()) //enables json parsing
server.use('/review',router)
server.use('/reviews',router1)






server.listen(3001,()=>{
    console.log('server is running at port 3001')
})
const express = require('express')
const app = express()

const joi =require('@hapi/joi')

// 引入cors,允许资源跨域共享
const cors = require('cors')
app.use(cors())

// 解析表单数据
app.use(express.urlencoded({extended:false}))

// 封装res.cc结果处理函数
app.use((req,res,next)=>{
    res.cc=(err,status=1) => {
       res.send({
           status,
        //    状态描述
        message: err instanceof Error ? err.message:err
       })

    }
    next()
})



// 引入路由模块
const userrouter = require('./router1/user1')
app.use('/api',userrouter)



// 定义全局的错误中间件
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.cc()
    res.cc(err)
})


// 开启服务器
app.listen(3008,()=>{
    console.log('express server is running at http://127.0.0.1:3008')
    
})
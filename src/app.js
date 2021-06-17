const path =require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port=process.env.PORT || 3000


//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'nidhin'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'nidhin'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        helpText:'this is some helpful text',
        name:'nidhin'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'you must enter the location'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({
                 error:'error'
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if (error){
                return res.send({
                    error:'error'
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address

            })
        })
    })
        

    
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'you must enter a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'nidhin',
        errorMessage:'help article not found'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'nidhin',
        errorMessage:'page not found'
    })

})


app.listen(port,()=>{
    console.log('server is up on port '+ port)
})
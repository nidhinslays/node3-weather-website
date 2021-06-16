const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=e481fbd69e908711c396f09dd82d23ab&query=' + longitude + ',' + latitude + '&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the location services',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.current.temperature +' degrees out.it feels like '+body.current.feelslike+' degrees out')
        }
        
        
    })
}




module.exports=forecast
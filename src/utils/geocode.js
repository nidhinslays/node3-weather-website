const request=require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoibmlkNzg2NyIsImEiOiJja3BscGt3OWUweTUzMm9xcjliMjU1c3ZpIn0.H6VGsIwSZEUlbp8DWjaMlg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the location services',undefined)
        }else if(body.length === 0){
            callback('unable to find the location.try another search',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })


}

module.exports=geocode
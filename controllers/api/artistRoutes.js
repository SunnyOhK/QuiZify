// const fetch = require('isomorphic-fetch');
// const router = require('express').Router();
// const Artist=require('../../models/artist');

// router.post('/', async (req, res)=>{

//     const artistInfo=await getApi(req.body.url);

//     const artistData=await Artist.create({
//         id:artistInfo.id,
//         name:artistInfo.name,
//         picture:artistInfo.picture,
//         link:artistInfo.link
//     })
//     res.json(artistData);
// })

// // Artist
// "https://api.deezer.com/artist/663"
// // tracklist
// "https://api.deezer.com/artist/663/top?limit=50"

// // const api_url = "https://api.deezer.com/artist/663";

// // Defining async function
// async function getApi(url) {
//     // Storing response
//     const response = await fetch(url);
//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);
//     return (data);
// }
// // Calling that async function
// // getapi(api_url);


// module.exports=router;
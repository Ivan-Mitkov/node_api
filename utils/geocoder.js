const NodeGeocoder=require('node-geocoder');

//https://github.com/nchaulet/node-geocoder
const options={
    provider: process.env.GEOCODER_PROVIDER,

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
}
// console.log('API KEY:',process.env.GEOCODER_API_KEY)
const geocoder = NodeGeocoder(options);

module.exports=geocoder;



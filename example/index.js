const express = require('express');
const { createIPX } = require('ipx');
const { createIPXS3Middleware } = require('../');

const s3BaseUrl = 'https://my-bucket.s3.us-west-2.amazonaws.com';

const ipx = createIPX({ domains: [s3BaseUrl] });

const app = express();
app.use('/images', createIPXS3Middleware(ipx, s3BaseUrl));

app.listen(3001, () => {
  console.log(`🚀 Image processing service is ready at http://localhost:3001`)
});
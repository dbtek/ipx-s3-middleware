ipx-s3-middleware
===

A simple middleware which translates given image path to http sourced S3 url for [IPX](https://github.com/unjs/ipx).

It basically enables you to source S3 urls (or any other public remote urls) by the path `/s_200x200/path/to/image.jpg` instead of `/s_200x200/https://my-bucket.s3.us-west-2.amazonaws.com/path/to/image.jpg`.

### Usage

```bash
$ npm i ipx-s3-middleware
# or with yarn
$ yarn add ipx-s3-middleware
```

### Example

`server.js`
```js
const express = require('express');
const { createIPX } = require('ipx');
const { createIPXS3Middleware } = require('ipx-s3-middleware');

const s3BaseUrl = 'https://my-bucket.s3.us-west-2.amazonaws.com';

const ipx = createIPX({ domains: [s3BaseUrl] });

const app = express();
app.use('/images', createIPXS3Middleware(ipx, s3BaseUrl));

app.listen(3001, () => {
  console.log(`🚀 Image processing service is ready at http://localhost:3000`)
});
```

**URL**  
`GET http://localhost/images/{modifiers}/{objectPath}`

Example: `GET http://localhost:3001/images/s_200x200/path/to/image`
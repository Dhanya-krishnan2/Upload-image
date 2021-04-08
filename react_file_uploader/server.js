const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server Started...'));

// adding get routes to 

// app.get(('/img/:id'), async(req, res) => {
//   const id = req.params.id;
//   const img = await knex('').where({ id: id}).first();
//   if(img) {
//     const contentType = await FileType.fromBuffer(img.img);
//     res.type(contentType.mime);
//     res.end(img.img);

//   } else {
//     console.log("no image with that id");
//   }


// 

// app.get('/img/:id', async (req, res) => {
//   const id = req.params.id;
//   const img = await knex('img').where({id: id}).first();
//   if (img) {
//       const contentType = await FileType.fromBuffer(img.img); // get the mimetype of the buffer (in this case its gonna be jpg but can be png or w/e)
//       res.type(contentType.mime); // not always needed most modern browsers including chrome will understand it is an img without this
//       res.end(img.img);
//   } else {
//       res.end('No Img with that Id!');
//   }

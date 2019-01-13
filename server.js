const express=require('express');
const cors=require('cors')
const bodyParser=require('body-parser')
const formidable=require('formidable')
const fs=require('fs');
const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/fileupload',(req,res)=>{
  console.log('Post image');
  let form=formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    let oldPath=files.filetoupload.path;
    console.log(__dirname);
    let newPath=__dirname+'/public/'+files.filetoupload.name;
    fs.rename(oldPath,newPath,(err)=>{
      if(err){
        throw err;
      }
      res.write('File uploaded and moved');
      res.end();
    })
  })
})

app.listen(8000,()=>{
  console.log("Server started on localhost://8000")
})
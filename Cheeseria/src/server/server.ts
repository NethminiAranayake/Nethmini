import express = require('express');
import apiRouter from './routes';

const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));
app.use(apiRouter);
app.use(express.json());
app.use(express.urlencoded());
app.post('/api/purchases',(req, res, next)=>{
    let ts = Date.now();
    var data = JSON.stringify(req.body, null,2);
    var file_name = 'purchase_'+ts+'.json';
    var jsonPath = path.join(__dirname,'..','src','server','data', file_name);
    fs.writeFile(jsonPath,data, finished);

    function finished(){
        res.send("successful");
    }
});

app.get('/api/recent_purchases', (req, res, next) => {

    var jsonPath = path.join(__dirname, '..', 'src', 'server', 'data');

    var files = fs.readdirSync(jsonPath)
    .filter((file: any) => fs.lstatSync(path.join(jsonPath, file)).isFile())
    .map((file: any) => ({ file, mtime: fs.lstatSync(path.join(jsonPath, file)).mtime }))
    .sort((a: { mtime: { getTime: () => number; }; }, b: { mtime: { getTime: () => number; }; }) => b.mtime.getTime() - a.mtime.getTime());

    //console.log(files.length ? files[0]['file'] : undefined);
    var file_name = files.length ? files[0]['file'] : undefined;
    let rawdata = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'server', 'data', file_name));
    let recent_purchases = JSON.parse(rawdata);
    //console.log(recent_purchases);

    res.send(recent_purchases);

});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
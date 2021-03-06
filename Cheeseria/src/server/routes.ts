import * as express from 'express';
const cheeses = require('./data/cheeses.json');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});
router.get('/api/recent_purchases', (req, res, next) => {

    var jsonPath = path.join(__dirname, '..', 'src', 'server', 'data');

    var files = fs.readdirSync(jsonPath)
    .filter((file: any) => fs.lstatSync(path.join(jsonPath, file)).isFile())
    .map((file: any) => ({ file, mtime: fs.lstatSync(path.join(jsonPath, file)).mtime }))
    .sort((a: { mtime: { getTime: () => number; }; }, b: { mtime: { getTime: () => number; }; }) => b.mtime.getTime() - a.mtime.getTime());

    var file_name = files.length ? files[0]['file'] : undefined;

    let rawdata = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'server', 'data', file_name));
    
    let recent_purchases = JSON.parse(rawdata);
    res.json(recent_purchases);
    

});

export default router;
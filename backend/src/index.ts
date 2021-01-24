// tslint:disable-next-line
require('tsconfig-paths/register');
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

import { port, apiBase } from '@config/constants';

// const rustAddons = require('../native');

import { Request, Response } from 'express';

// Create Express instance
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const imgPath = path.join(__dirname, '../images');
const images = fs.readdirSync(imgPath);

// Routes


app.use('/media', express.static(path.join(__dirname, '../images')));

function getUnique(count: number, array: string[]) {
  // Make a copy of the array
  const tmp = array.slice(0);
  let ret = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * tmp.length);
    const removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}

app.get('/random', (req: Request, res: Response) => {
  const imageNames = getUnique(2, images);
  res.json({images: imageNames});
});

// win:lose:total
app.post('/select', (req: Request, res: Response) => {
  const selectedImg = req.body.selected;
  const lostImg = req.body.lost;
  console.log(`${__dirname}/db.json`);
  fs.readFile(`${__dirname}/db.json`, 'utf8', (_, jsonString) => {
    const json = JSON.parse(jsonString);
    if (json.hasOwnProperty(selectedImg)) {
      let score = json[selectedImg].split(':');
      score[0] = parseInt(score[0]) + 1;
      score[2] = parseInt(score[2]) + 1;
      json[selectedImg] = score.join(':')
    } else {
      json[selectedImg] = '1:0:1';
    }

    if (json.hasOwnProperty(lostImg)) {
      let score = json[lostImg].split(':');
      score[1] = parseInt(score[1]) + 1;
      score[2] = parseInt(score[2]) + 1;
      json[lostImg] = score.join(':')
    } else {
      json[lostImg] = '0:1:1';
    }
    const file = JSON.stringify(json, null, 2);
    fs.writeFile(`${__dirname}/db.json`, file, (err) => {
      console.log(`${__dirname}/db.json`);
      console.log(err);
      res.json({success: true, msg: 'Wrote to JSON'});
    });
  });
});

app.get('/results', (req: Request, res: Response) => {
  fs.readFile(`${__dirname}/db.json`, 'utf8', (_, jsonString) => {
    const results = JSON.parse(jsonString);
    console.log(results);
    const resArray = [];

    for (let prop of Object.keys(results)) {
      const resultValue = results[prop].split(':');
      const score = parseInt(resultValue[0]) / parseInt(resultValue[2]);
      console.log(prop);
      const obj: any = {};
      obj['name'] = prop;
      obj['value'] = score;
      resArray.push(obj);
    }

    resArray.sort((a, b) => {
      return b.value - a.value;
    });

    res.json({results: resArray});
  });
});

console.log(path.join(__dirname, '../images'));
app.get(apiBase, (_, res: Response) => {
  console.log(`Test API Base: ${apiBase}`);
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});

app.get('', (_, res: Response) => {
  console.log('Test Blank');
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});

app.listen(port, () => {
  console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
  console.log('Port: ' + port);
});

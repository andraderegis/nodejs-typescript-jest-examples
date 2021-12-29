import express from 'express';

const app = express();

app.get('/', (req, res) =>
  res.json({
    message: 'NodeJS Typescript Setup'
  })
);

app.listen(3333);

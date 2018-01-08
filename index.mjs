import querystring from 'querystring';
import Koa from 'koa';
import fetch from 'node-fetch';
import chalk from 'chalk';
import logger from 'koa-pino-logger';
import bodyparser from 'koa-bodyparser';
import query from './query';
const app = new Koa();
app.silent = true;
app.use(logger({ prettyPrint: true, level: 'debug' }));
app.use(bodyparser());
app.use(query);

const service = async ctx => {
  const { url } = ctx;
  try {
    const request = await fetch(url());
    const json = await request.json();
    console.log(json);
    ctx.body = json;
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

app.use(service);

const server = app.listen(5000);

console.log(
  chalk.cyan.bold(
    `Listening on port: http://localhost:${server.address().port}`
  )
);

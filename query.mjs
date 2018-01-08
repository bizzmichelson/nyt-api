import { ARCHIVE_PARAMS, API_URLS, SCHEMA, API_KEY } from './constants';
const checkParams = async (ctx, next) => {
  const { request: { body: { api, params } } } = ctx;
  console.log(ctx.request.body);
  if (!api) ctx.throw(401, `An 'api' was not specified`);
  params['api-key'] = API_KEY;
  switch (api) {
    case 'archive':
      try {
        ctx.url = API_URLS.archive(params);
        await next();
        break;
      } catch (error) {
        ctx.throw(401, error.message);
        break;
      }

    default:
      ctx.throw(404, `No matching 'api' was found`);
      break;
  }
};

export default checkParams;

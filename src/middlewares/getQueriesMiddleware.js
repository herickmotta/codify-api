/* eslint-disable prefer-destructuring */
function getQueriesMiddleware(req, res, next) {
  let limit = null;
  let offset = null;
  let order = null;
  if (req.query.range) {
    const range = JSON.parse(req.query.range);
    limit = range[1] - range[0] + 1;
    offset = range[0];
  }
  if (req.query.sort) {
    order = [JSON.parse(req.query.sort)];
  }
  const queryConfig = { limit, offset, order };
  req.queryConfig = queryConfig;

  next();
}

module.exports = getQueriesMiddleware;

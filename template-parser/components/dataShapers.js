const utils = require('./utils');

module.exports.byRoute = (data) => {
  data = data.reduce((acc, cur) => {
    let routes = cur.api_route.split(",");
    routes.map((route) => {
      let obj = cur;
      obj.api_route = route;
      acc.push(cur);
    })
    return acc;
  }, [])
  return utils.groupBy(data, 'api_route');
}

// eslint-disable-next-line import/no-extraneous-dependencies
const city = require('./geographic/city.json');

const province = require('./geographic/province.json');

function getProvince(_, res) {
  return res.json({
    data: province,
  });
}

function getCity(req, res) {
  return res.json({
    data: city[req.params.province],
  });
}


export default {
  // 支持值为 Object 和 Array
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};

const moment = require('moment');

exports.getCurrentDateTime = () => {
  const currentDateTime = String(moment().format('YYYY-MM-DD HH:mm:ss'));
  return currentDateTime;
};

const configs = require('./default.config');

function rewrite(obj, isProd){
  let rewriteValues;

  try {
    if(isProd){
      rewriteValues = require('./production.config');
    } else {
      rewriteValues = require('./development.config');
    }
  }catch (e) {
    return obj
  }

  for (let i in rewriteValues){
    obj[i] = rewriteValues[i];
  }
  return obj
}
const finalConfig = rewrite(configs, process.env.NODE_ENV === 'production');
module.exports = finalConfig;

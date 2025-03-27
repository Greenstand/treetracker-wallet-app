/*
 * A file to setup some global setting, like log level
 */
const log = require("loglevel");

if(process.env.NODE_LOG_LEVEL){
  log.setDefaultLevel(process.env.NODE_LOG_LEVEL);
}else{
  log.setDefaultLevel("info");
}


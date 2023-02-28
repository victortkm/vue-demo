
function concatAPIString(url, param, val, isFirstParam) {
  let symbol = "&"

  if(isFirstParam){
    symbol = "?"
  }

  return url += symbol + param + "=" + val
}

function genAPIParamQuery(url, originalUrl, param, val) {
  if(url == originalUrl){
    return concatAPIString(url, param, val, true)
  } else {
    return concatAPIString(url, param, val, false);
  }
}

function getStatus(val){
  switch(val){
    case 'y': 
      return 'Active'
    case 'p':
      return 'Pending'
    default:
      return val
  }
}

export default {
  concatAPIString: concatAPIString,
  genAPIParamQuery: genAPIParamQuery,
  getStatus: getStatus
}
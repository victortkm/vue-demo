import Const from '../constant'

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

function getChangeMode(val){
  switch(val){
    case Const.WFL_MODE_NEW:
      return Const.MODE_NEW
    case Const.WFL_MODE_EDIT:
      return Const.MODE_EDIT
    case Const.WFL_MODE_DELETE:
      return Const.MODE_DELETE
    default:
      return val
  }
}
function getWflType(val){
  switch(val){
    case Const.WFL_TYPE_GRP:
      return Const.WFL_TYPE_STRING_GRP
    case Const.WFL_TYPE_FNC:
      return Const.WFL_TYPE_STRING_FNC
    case Const.WFL_TYPE_GPFC:
      return Const.WFL_TYPE_STRING_GPFC
    case Const.WFL_TYPE_USR:
      return Const.WFL_TYPE_STRING_USR
    case Const.WFL_TYPE_FCC:
      return Const.WFL_TYPE_STRING_FCC
    default:
      return val
  }
}

function onEditableCheck(val){
  if(
    val != Const.MODE_VIEW &&
    val != Const.MODE_APPROVE_REJECT
  ){
    return true
  } else {
    return false
  }
}

function authPermission(cPermission, vPermission, ePermission, dPermission, list){
  let create = false
  let view = false
  let edit = false
  let del = false

  if(list.filter(val=> val == cPermission).length > 0){
    create = true
  }
  if(list.filter(val=> val == vPermission).length > 0){
    view = true
  }
  if(list.filter(val=> val == ePermission).length > 0){
    edit = true
  }
  if(list.filter(val=> val == dPermission).length > 0){
    del = true
  }
  console.log(cPermission, vPermission, ePermission, dPermission)
  console.log(create, view, edit, del, list)
  return({create, view, edit, del})
}

export default {
  concatAPIString: concatAPIString,
  genAPIParamQuery: genAPIParamQuery,
  getStatus: getStatus,
  getChangeMode: getChangeMode,
  getWflType: getWflType,
  onEditableCheck: onEditableCheck,
  authPermission: authPermission
}
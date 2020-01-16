import { FETCH_AD_BY_ID_SUCCESS,
  FETCH_AD_BY_ID_INIT,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_INIT,
  FETCH_ADS_FAIL,
  UPDATE_AD_SUCCESS,
  UPDATE_AD_FAIL,
  RESET_AD_ERRORS } from '../actions/types';

const INITIAL_STATE = {
ads: {
data: [],
errors: []
},
ad: {
data: {},
errors: []
}
}

export const adReducer = (state = INITIAL_STATE.ads, action) => {
  switch(action.type) {
    case FETCH_ADS_INIT:
    return {...state, data: [], errors: []};
    case FETCH_ADS_SUCCESS:
    return {...state, data: action.ads};
    case FETCH_ADS_FAIL:
    return Object.assign({}, state, {errors: action.errors, data: []});
    default:
  return state;
}
}


export const selectedAdReducer = (state = INITIAL_STATE.ad, action) => {
    switch(action.type) {
      case FETCH_AD_BY_ID_INIT:
      return {...state, data: {}};
      case FETCH_AD_BY_ID_SUCCESS:
      return Object.assign({}, state, { data: action.ad});
      case UPDATE_AD_SUCCESS:
      return {...state, data: action.ad};
      case UPDATE_AD_FAIL:
      return {...state, errors: action.errors};
      case RESET_AD_ERRORS:
      return {...state, errors: []};
      default:
      return state;
}
}

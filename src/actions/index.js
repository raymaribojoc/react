
import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { FETCH_AD_BY_ID_SUCCESS,
         FETCH_AD_BY_ID_INIT,
         FETCH_ADS_SUCCESS,
         FETCH_ADS_INIT,
         FETCH_ADS_FAIL,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         FETCH_USER_BOOKINGS_SUCCESS,
         FETCH_USER_BOOKINGS_FAIL,
         FETCH_USER_BOOKINGS_INIT,
        // UPDATE_AD_SUCCESS,
         //UPDATE_AD_FAIL,
        //RESET_AD_ERRORS,
         RELOAD_MAP,
         RELOAD_MAP_FINISH 
        } from './types';

const axiosInstance = axiosService.getInstance();

export const verifyAdOwner = (adId) => {
  return axiosInstance.get(`/ads/${adId}/verify-user`);
}

export const reloadMap = () => {
  return {
    type: RELOAD_MAP
  }
}

export const reloadMapFinish = () => {
  return {
    type: RELOAD_MAP_FINISH
  }
}

// adS ATIONS ---------------------------

const fetchAdByIdInit = () => {
  return {
    type: FETCH_AD_BY_ID_INIT
  }
}

const fetchAdByIdSuccess = (ad) => {
  return {
    type: FETCH_AD_BY_ID_SUCCESS,
    ad
  }
}

const fetchAdsSuccess = (ads) => {
  return {
    type: FETCH_ADS_SUCCESS,
    ads
  }
}

const fetchAdsInit = () => {
  return {
    type: FETCH_ADS_INIT
  }
}

const fetchAdsFail = (errors) => {
  return {
    type: FETCH_ADS_FAIL,
    errors
  }
}

export const fetchAds = (city) => {
  const url = city ? `/ads?city=${city}` : '/ads';

  return dispatch => {
    dispatch(fetchAdsInit());

    axiosInstance.get(url)
      .then(res => res.data )
      .then(ads => dispatch(fetchAdsSuccess(ads)))
      .catch(({response}) => dispatch(fetchAdsFail(response.data.errors)))
  }
}

export const fetchAdById = (adId) => {
  return function(dispatch) {
    dispatch(fetchAdByIdInit());

    axios.get(`/api/v1/ads/${adId}`)
      .then(res => res.data )
      .then(ad => dispatch(fetchAdByIdSuccess(ad))
    );
  }
}

export const createAd = (adData) => {
  return axiosInstance.post('/ads', adData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}
/*
export const resetAdErrors = () => {
  return {
    type: RESET_AD_ERRORS
  }
}
*/
/*
const updateAdSuccess = (updatedAd) => {
  return {
    type: UPDATE_AD_SUCCESS,
    ad: updatedAd
  }
}
*/
/*
const updateAdFail = (errors) => {
  return {
    type: UPDATE_AD_FAIL,
    errors
  }
}
*/
/*

export const updateAd = (id, adData) => dispatch => {
  return axiosInstance.patch(`/ads/${id}`, adData)
    .then(res => res.data)
    .then(updatedAd => {
      dispatch(updateAdSuccess(updatedAd));

      if (adData.city || adData.street) {
        dispatch(reloadMap());
      }
    })
    .catch(({response}) => dispatch(updateAdFail(response.data.errors)))
}
*/
// USER BOOKINGS ACTIONS ---------------------------

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsSuccess = (userBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance.get('/bookings/manage')
      .then(res => res.data )
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)))
  }
}

// USER ADS ACTIONS ---------------------------

export const getUserAds = () => {
  return axiosInstance.get('/ads/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const deleteAd = (adId) => {
  return axiosInstance.delete(`/ads/${adId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}

// AUTH ACTIONS ---------------------------

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({response}) => {
        dispatch(loginFailure(response.data.errors));
      })
  }
}

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  }
}

export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
}



export const uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image);

  return axiosInstance.post('/image-upload', formData)
    .then(json => {
      return json.data.imageUrl;
    })
    .catch(({response}) => Promise.reject(response.data.errors[0]))
}


export const getPendingPayments = () => {
  return axiosInstance.get('/payments')
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))
}

export const acceptPayment = (payment) => {
  return axiosInstance.post('/payments/accept', payment)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))
}

export const declinePayment = (payment) => {
  return axiosInstance.post('/payments/decline', payment)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))
}























































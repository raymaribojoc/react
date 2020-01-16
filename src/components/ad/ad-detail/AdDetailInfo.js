import React from 'react';
import { AdAssets } from './AdAssets';
import { toUpperCase, adType }  from 'helpers'; // called from helpers folder

export function AdDetailInfo(props) {
    const ad = props.ad;

    return (
        
      <div className='ad'>
          <h2 className={`ad-type ${ad.category}`}>{adType(ad.shared)} {ad.category}</h2>

          <div className='ad-owner'>
            <img src='https://api.adorable.io/avatars/285/abott@adorable.png' alt='owner'/>
            <span>{ad.user && ad.user.username}</span>
              </div>


          <h1 className='ad-title'>{ad.title}</h1>
          <h2 className='ad-city'>{toUpperCase(ad.city)}</h2>
          <div className='ad-room-info'>
            <span><i className='fa fa-building'></i>{2} bedrooms</span>
            <span><i className='fa fa-user'></i> { 4} guests</span>
            <span><i className='fa fa-bed'></i> { 2} beds</span>
          </div>
          <p className='ad-description'>
            {ad.description}
          </p>
          <hr></hr>
          <AdAssets />
      </div>
    )
}

    

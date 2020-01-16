import React from 'react';
import { Link } from 'react-router-dom';

import { adType } from 'helpers';

export function AdCard(props) {
  const ad = props.ad;

  return (
    <div className={props.colNum}>
      <Link className='ad-detail-link' to={`/ads/${ad._id}`}>
        <div className='card bwm-card'>
          <img className='card-img-top' src={ad.image} alt={ad.title}></img>
          <div className='card-block'>
            <h6 className={`card-subtitle ${ad.category}`}>{adType(ad.shared)} {ad.category} &#183; {ad.city}</h6>
            <h4 className='card-title'>{ad.title}</h4>
            <p className='card-text'>PHP {ad.price} per Night &#183; Free Cancelation</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

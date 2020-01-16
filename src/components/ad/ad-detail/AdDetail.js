import React from 'react';
import { connect } from 'react-redux';
import {AdDetailInfo} from './AdDetailInfo';
import { toUpperCase, adType }  from 'helpers'; // called from helpers folder
import  Booking  from 'components/booking/Booking';

import * as actions from 'actions'; 

class AdDetail extends React.Component {
    componentWillMount() {
        //dispatch action
        const adId = this.props.match.params.id;

        this.props.dispatch(actions.fetchAdById(adId));
    }

    render() {
        const ad = this.props.ad;

        if (ad._id) {
            return (
                <section id='adDetails'>
                <div className='upper-section'>
                    <h4> this  detail.js upper</h4>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={ad.image} alt=''></img>
                        </div>
                        
                        <div className='col-md-6'>
                        
                        <div className='ad'>
          <h2 className={`ad-type ${ad.category}`}>{adType(ad.shared)} {ad.category}</h2>
          
          <h1 className='ad-title'>{ad.title}</h1>
          <h2 className='ad-city'>{toUpperCase(ad.city)}</h2>
          
          <p className='ad-description'>
            {ad.description}
          </p>
          <hr></hr>
          
      </div>
                       
                        </div>
                        
                    </div>
                </div>

                <div className='details-section'>
                    <h1> this is  detailsection</h1>
                    <div className='row'>
                    <div className='col-md-8'>

                        <AdDetailInfo  ad = {ad}/>
                       
                    </div>
                    
                    <div className='col-md-4'> 

                    <Booking ad={ad} />
                    </div>
                    

                    </div>
                    
                </div>
                </section>

            )   
        } else {
            return (
                <h1> Loading.....</h1>
            )
        }        
    }
}

function mapStateToProps(state) {
    return {
        ad: state.ad.data
    }
  }
  
  export default connect(mapStateToProps)(AdDetail)

  
//   <img src={ad.image} alt=''></img>
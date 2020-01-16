import React from 'react'; 
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from 'helpers';

import * as actions from 'actions';

 class BookingManage extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());

  }

    render() {
      const { data: bookings, isFetching } = this.props.userBookings;
  
        return (
                  
             <section id='userBookings'>
                <h1 className='page-title'>My Bookings</h1>
                <div className='row'>
                  { bookings.map((booking, index) => 
                  
                  <div className='col-md-4'>
                  <div className='card text-center'>
                    <div className='card-header'>
                      {booking.ad ? booking.ad.category : 'Deleted Ads'}
                    </div>
                    <div className='card-block'>
                      { booking.ad &&
                      <div>
                            <h4 className='card-title'> {booking.ad.titlle} - {toUpperCase(booking.ad.city)}</h4>
                          <p className='card-text booking-desc'>{booking.ad.description}</p>
                      </div>
                      
                      }
                      
                      
                  
                  <p className='card-text booking-days'>{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
                  <p className='card-text booking-price'><span>Price: </span> <span className='booking-price-value'>{booking.totalprice}</span></p>

                  { booking.ad &&
                      <Link className='btn btn-bwm' to={`/ads/${booking.ad._id}`}>Go to Rental</Link>
                  }
                    </div>
                    <div className='card-footer text-muted'>
                      Created {pretifyDate(booking.createdAt)}
                    </div>
                  </div>
                </div>
                  )}
               
                
                </div>
                { !isFetching && bookings.length === 0 &&
                  <div class='alert alert-warning'>
                    You have no bookings created go to rentals section and book your place today.
                    <Link style={{'margin-left': '10px'}} class='btn btn-bwm' to='/ads'>Available Rental</Link>
                  </div>
               }
            </section>
        )
    }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)

/*
import React from 'react'; 
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from 'actions';



 class BookingManage extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());

  }

    render() {
      const { userBookings } = this.props;
  
        return (
             
                
             <section id='userBookings'>
                <h1 className='page-title'>My Bookings</h1>
                <div className='row'>
                { userBookings.data.map((booking, index) => 
                <p key={index}> {booking.startAt} - {booking.endAt} </p>
                
                )}

                <div className='col-md-4'>
                    <div className='card text-center'>
                      <div className='card-header'>
                        Rental Category
                      </div>
                      <div className='card-block'>
                        <h4 className='card-title'> Rental Title - Rental City</h4>
                        <p className='card-text booking-desc'>Rental Description</p>
                        <p className='card-text booking-days'>2018/04/04 - 2018/04/06 | 2 days</p>
                        <p className='card-text booking-price'><span>Price: </span> <span className='booking-price-value'>205 $</span></p>
                        <Link className='btn btn-bwm' to='rental detail'>Go to Rental</Link>
                      </div>
                      <div className='card-footer text-muted'>
                        Created 2018/03/03
                      </div>
                    </div>
                  </div>
                </div>
                <div class='alert alert-warning'>
                  You have no bookings created go to rentals section and book your place today.
                  <Link style={{'margin-left': '10px'}} class='btn btn-bwm' to='rentals index page'>Available Rental</Link>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)

*/
import React from 'react';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from 'helpers';

export function BookingCard(props) {

  const { booking } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.ad ? booking.ad.category : 'Deleted Ads'}
        </div>
        <div className="card-block">
          { booking.ad &&
            <div>
              <h4 className="card-title"> {booking.ad.title} - {toUpperCase(booking.ad.city)}</h4>
              <p className="card-text booking-desc">{booking.ad.description}</p>
            </div>
          }
          <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">{booking.totalPrice} $</span></p>
           { booking.ad &&
              <Link className="btn btn-bwm" to={`/ads/${booking.ad._id}`}>Go to Ads</Link>
           }
        </div>
        <div className="card-footer text-muted">
          Created {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  )
}


export function PaymentCard(props) {
  const { booking, payment, paymentBtns } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          Booking Made By {payment.fromUser.username}
        </div>
        <div className="card-block">
          { booking.ad &&
            <div>
              <h4 className="card-title"> {booking.ad.title} - {toUpperCase(booking.ad.city)}</h4>
              <p className="card-text booking-desc">{booking.ad.description}</p>
            </div>
          }
          <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">{payment.amount / 100} $</span></p>
          <p className="card-text payment-status">Status: {payment.status}</p>
           { booking.ad &&
              <Link className="btn btn-bwm" to={`/ads/${booking.ad._id}`}>Go to Ads</Link>
           }
        </div>
        <div className="card-footer text-muted">
          Created {pretifyDate(booking.createdAt)}
          { payment.status === 'pending' && paymentBtns && paymentBtns(payment) }
        </div>
      </div>
    </div>
  )
}

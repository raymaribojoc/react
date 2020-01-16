const Booking = require('../models/booking');
const Ad = require('../models/ad');
/* const Payment = require('../models/payment');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

const config = require('../config');
const stripe = require('stripe')(config.STRIPE_SK);

const CUSTOMER_SHARE = 0.8;
*/
exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, ad } = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

  Ad.findById(ad._id)
        .populate('bookings')
        .populate('user')
        .exec(async function(err, foundAd) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (foundAd.user.id === user.id) { // it means owner of the rental 
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Ad!'}]});
    }

    
    if (isValidBooking(booking, foundAd)) {
      booking.user = user;
      booking.ad = foundAd;
      foundAd.bookings.push(booking);
      const { payment, err } = await createPayment(booking, foundAd.user, paymentToken);

      if (payment) {

        booking.payment = payment;
        booking.save(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }

          foundAd.save()
          User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

          return res.json({startAt: booking.startAt, endAt: booking.endAt});
        });
      } else {

        return res.status(422).send({errors: [{title: 'Payment Error', detail: err}]});
      }
    } else {

       return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
    }
  })
}

exports.getUserBookings = function(req, res) {
  const user = res.locals.user;

  Booking
    .where({user})
    .populate('ads')
    .exec(function(err, foundBookings) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundBookings);
  });
}



//validate booking
function isValidBooking(proposedBooking, ad) {
  let isValid = true;

  if (ad.bookings && ad.bookings.length > 0) {

    isValid = ad.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }

  return isValid;
}


async function createPayment(booking, toUser, token) {
  const { user } = booking;
  const tokenId = token.id || token;

  const customer = await stripe.customers.create({
    source: tokenId,
    email: user.email
  });

  if (customer) {
    User.update({_id: user.id}, { $set: {stripeCustomerId: customer.id}}, () => {});

    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * CUSTOMER_SHARE
    });

    try {
      const savedPayment = await payment.save();
      return {payment: savedPayment};

    } catch(err) {
      return {err: err.message};
    }

  } else {
    return {err: 'Cannot process Payment!'}
  }
}






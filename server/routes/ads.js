
const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({"secret": true});
});

router.get('/manage',  UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Ad
    .where({user})
    .populate('bookings')
    .exec(function(err, foundAds) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json(foundAds);
  });
});

router.get('/:id/verify-user', UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Ad
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundAd) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundAd.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not ads owner!'}]});
      }


      return res.json({status: 'verified'});
    });
});

router.get('/:id', function(req, res) {
  const adId = req.params.id;

  Ad.findById(adId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundAd) {

    if (err || !foundAd) {
      return res.status(422).send({errors: [{title: 'Ads Error!', detail: 'Could not find Ads!'}]});
    }

    return res.json(foundAd);
  });
});

router.patch('/:id', UserCtrl.authMiddleware, function(req, res) {

  const adData = req.body;
  const user = res.locals.user;

  Ad
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundAd) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundAd.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not ads owner!'}]});
      }

      foundAd.set(adData);
      foundAd.save(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.status(200).send(foundAd);
      });
    });
});

router.delete('/:id', UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;
  
  //find user by id
  Ad
    .findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date()}}
    })
    .exec(function(err, foundAd) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    // check if  userid id is the owner of the ads----
    if (user.id !== foundAd.user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not ads owner!'}]});
    }
    // check if there is a booking?

    if (foundAd.bookings.length > 0) {
      return res.status(422).send({errors: [{title: 'there is an Active Bookings!', detail: 'Cannot delete ad with active bookings!'}]});
    }

    foundAd.remove(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'status': 'deleted'});
    });
  });
});
/*___________________________________*/
router.post('', UserCtrl.authMiddleware, function(req, res) {
  const { title, city, street, category, image, description, price } = req.body;
  const user = res.locals.user;

  //const ad = new Ad({title, city, street, category, image, shared, bedrooms, description, dailyRate});

  const ad = new Ad({title, city, street, category, image, description, price});

  ad.user = user;

  Ad.create(ad, function(err, newAd) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    User.update({_id: user.id}, { $push: {ads: newAd}}, function(){});

    return res.json(newAd);
  });
});
/*__________________________________________*/
router.get('', function(req, res) {
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};

  Ad.find(query)
      .select('-bookings')
      .exec(function(err, foundAds) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (city && foundAds.length === 0) {
      return res.status(422).send({errors: [{title: 'No Ads Found!', detail: `There are no ads for city ${city}`}]});
    }

    return res.json(foundAds);
  });
});
/*__________________________________*/
module.exports = router;




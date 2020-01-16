const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const Ad = require('./models/ad');

const adRoutes = require('./routes/ads'),
       userRoutes = require('./routes/users');
       bookingRoutes = require('./routes/bookings');


mongoose.connect(config.DB_URI).then(() => {
    //if (process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb();
      //fakeDb.seedDb();
    //}
  });
const app = express();

app.use(bodyParser.json());

/* app.get('/ads', function(req, res) {
  res.json({'success': true});
}); */

app.use('/api/v1/ads',  adRoutes);
app.use('/api/v1/users',  userRoutes);
app.use('/api/v1/bookings', bookingRoutes );




const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log ('app is running');
});

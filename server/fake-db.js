const Ad = require('./models/ad');
const User = require('./models/user');
const Booking = require('./models/booking');

const fakeDbData = require('./data.json');

class FakeDb {

  constructor() {
    this.ads = fakeDbData.ads;
    this.users = fakeDbData.users;
  }

  async cleanDb() {
    await User.remove({});
    await Ad.remove({});
    await Booking.remove({});
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.ads.forEach((ad) => {
      const newAd = new Ad(ad);
      newAd.user = user;

      user.ads.push(newAd);
      newAd.save();
    });

    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;

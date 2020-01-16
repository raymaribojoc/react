import React from 'react';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { AdManageCard } from './AdManageCard';
import { AdManageModal } from './AdManageModal';
import { ToastContainer, toast } from 'react-toastify';

export class AdManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userAds: [],
      errors: [],
      isFetching: false
    }

    this.deleteAd = this.deleteAd.bind(this);
  }

  componentWillMount() {
    this.setState({isFetching: true});

    actions.getUserAds().then(
      userAds => this.setState({userAds, isFetching: false}),
      errors => this.setState({errors, isFetching: false}))
  }

  
  renderAdCards(ads) {
    return ads.map((ad, index) =>
     <AdManageCard modal={<AdManageModal bookings={ad.bookings}/>}
                       key={index}
                       ad={ad}
                       adIndex={index}
                       deleteAdCb={this.deleteAd} />);
  }

  deleteAd(adId, adIndex) {
    actions.deleteAd(adId).then(
      () => this.deleteAdFromList(adIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteAdFromList(adIndex) {
    const userAds = this.state.userAds.slice();
    userAds.splice(adIndex, 1);

    this.setState({userAds});
  }

  render() {
    const { userAds, isFetching } = this.state;

    return (
      <section id='userAds'>
        <ToastContainer />
        <h1 className='page-title'>My Ads</h1>
        <div className='row'>
        {this.renderAdCards(userAds)}
        </div>
        { !isFetching && userAds.length === 0 &&
          <div className='alert alert-warning'>
            You dont have any Ads currenty created. If you want Post Ads
            please follow this link.
            <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/ads/new'>Post Ads</Link>
          </div>
        }
      </section>
    )
  }
}




/*
import React from 'react';
import * as actions from 'actions';


export class AdManage extends React.Component {

    constructor() {
        super();

        this.state = {
            userAds: [],
            errors: []
        }
    }

    componentWillMount() {
        actions.getUserAds().then(
        userAds => this.setState({userAds}),
        errors => this.setState({errors}))
    
    }

    render() {
        const { userAds } = this.state;

        return (
            <div>
                {
                // display the title of the ads--- amazing    
            //userAds.map((ad, index) => <p key={index}> {ad.title}</p>)

                }
            </div>
        
        )
    }

}
*/
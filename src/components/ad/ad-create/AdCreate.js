import React from 'react';
import AdCreateForm from './AdCreateForm';
import { Redirect } from 'react-router-dom';

import * as actions from 'actions';

export class AdCreate extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }

    this.adCateogies = ['car', 'car accessories', 'Mobile Telephone','apartment', 'house', 'condo'];

    this.createAd = this.createAd.bind(this);
  }

  createAd(adData) {
  
    actions.createAd(adData).then(
      (ad) => this.setState({redirect: true}),
      (errors) => this.setState({errors}))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/ads'}}/>
    }

    return (
      <section id='newAd'>
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
              <h1 className='page-title'>Create Ads</h1>
              <AdCreateForm submitCb={this.createAd}
                                options={this.adCateogies}
                                errors={this.state.errors}/>
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'> A few clicks to see some ads.</h2>
                <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt=''/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

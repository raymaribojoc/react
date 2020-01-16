import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';


import  Header  from 'components/shared/Header';
//import  Footer from 'components/shared/Footer';
//import { Footer } from 'shared/Footer';
import   AdListing  from 'components/ad/ad-listing/AdListing';
import AdSearchListing from 'components/ad/ad-listing/AdSearchListing';

import AdDetail from 'components/ad/ad-detail/AdDetail';
import { AdCreate } from 'components/ad/ad-create/AdCreate';
import  Login  from 'components/login/Login';
import { Register } from 'components/register/Register';

import { AdManage } from 'components/ad/ad-manage/AdManage';
import BookingManage from 'components/booking/booking-manage/BookingManage';


import { ProtectedRoute } from 'components/shared/auth/ProtectedRoute';
import { LoggedInRoute } from 'components/shared/auth/LoggedInRoute';

import * as actions from 'actions';

import 'App.css';

const store = require('./reducers').init();

class App extends Component {

    componentWillMount() {
      this.checkAuthState();
     
    }

    checkAuthState() {
       store.dispatch(actions.checkAuthState());
    }

    logout() {
      store.dispatch(actions.logout());
    }
  
  render() {
    
       return (
        <Provider store={store}>
          <BrowserRouter>
            <div className='App'>
              <Header logout={this.logout} />
              <div className='container'>
                <Switch>
                  <Route exact path ='/' render={() => <Redirect to= '/ads' />}/>
                  <Route exact path ='/ads' component={ AdListing} />
                  <Route exact path='/ads/:city/homes' component={AdSearchListing} />
                  
                  <ProtectedRoute  exact path ='/ads/manage' component ={AdManage}/> 
                  <ProtectedRoute  exact path ='/bookings/manage' component ={BookingManage}/> 
                  <ProtectedRoute  exact path ='/ads/new' component ={AdCreate}/>  
                  <Route  exact path ='/ads/:id' component ={AdDetail}/>  
                  <Route exact path ='/login' component={ Login} /> 
                  <LoggedInRoute exact path ='/register' component={ Register} /> 
              </Switch>

                
              </div>
           
             
            
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}



export default App;

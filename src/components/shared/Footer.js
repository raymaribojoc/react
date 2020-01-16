
import React from 'react';


const Footer = () => {
  return (
    <nav className='navbar navbar-dark navbar-expand-lg'>
      <div className='container'>
        <div className='navbar-brand' to='/ads'>Post Your Ads
          <img src={process.env.PUBLIC_URL + '/img/react-logo.svg'} alt=""/>
        </div>
       
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          

        </div>
      </div>
    </nav>
  )
}


export default Footer;


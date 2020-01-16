import React from "react";
import { AdList} from "./AdList";
import { connect } from 'react-redux';

import * as actions from 'actions';

class AdListing extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(actions.fetchAds());
  }

  render() {
    return (
      
      <section id="adListing">
        
        <h1 className="page-title">Your Home All Around the World</h1>
        <AdList  ads ={ this.props.ads }/>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
  ads:state.ads.data
  
  }
}

export default connect(mapStateToProps)(AdListing)
//export default connect(mapStateToProps)(AdListing)

import React from "react";
import { AdCard } from "./AdCard";

//import * as actions from 'actions';

export class AdList extends React.Component {
  
  renderAds() {
    return this.props.ads.map((ad, index) => {
      return (
       <AdCard key={index}
             colNum='col-md-3 col-xs-6'
             ad={ad}/>
          )
    });
  }
    render() {
  
    return (
        <div className="row">
            {this.renderAds()}
        </div>
    )
  }
}




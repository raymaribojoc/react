import React from 'react';
import { AdList } from './AdList';
import { connect } from 'react-redux';

import { toUpperCase } from 'helpers';
import * as actions from 'actions';


class AdSearchListing extends React.Component {

  constructor() {
    super();

    this.state = {
      searchedCity: ''
    }
  }

  componentWillMount() {
    this.searchAdsByCity();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchAdsByCity();
    }
  }

  searchAdsByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({searchedCity});

    this.props.dispatch(actions.fetchAds(searchedCity));
  }

  renderTitle() {
    const { errors, data } = this.props.ads;
    const { searchedCity } = this.state;
    let title = '';

    if (errors.length > 0) {
      title = errors[0].detail;
    }

    if(data.length > 0) {
      title = `Your Home in City of ${toUpperCase(searchedCity)}`;
    }

    return <h1 className="page-title">{title}</h1>
  }

  render() {
    return (
      <section id="adListing">
        {this.renderTitle()}
        <AdList ads={this.props.ads.data} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    ads: state.ads
  }
}

export default connect(mapStateToProps)(AdSearchListing)

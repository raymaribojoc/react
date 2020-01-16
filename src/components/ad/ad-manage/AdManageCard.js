import React from 'react';
import { toUpperCase, pretifyDate } from 'helpers';
import { Link } from 'react-router-dom';

export class AdManageCard extends React.Component {

  constructor() {
    super();

    this.state = {
      wantDelete: false
    }
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    })
  }

  deleteAd(adId, adIndex) {
    this.setState({wantDelete: false});

    this.props.deleteAdCb(adId, adIndex);
  }


  render() {
    const { ad, modal, adIndex } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';

    return (
      <div className='col-md-4'>
        <div className={`card text-center ${deleteClass}`}>
          <div className='card-block'>
            <h4 className='card-title'>{ad.title} - {toUpperCase(ad.city)}</h4>
            <Link className='btn btn-bwm' to={`/ads/${ad._id}`}>Go to Ad</Link>
            { ad.bookings && ad.bookings.length > 0 && modal }
          </div>
          <div className='card-footer text-muted'>
            Created at {pretifyDate(ad.createdAt)}
            { !wantDelete &&
              <React.Fragment>
                <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Delete </button>
                <Link className='btn btn-warning' to={{pathname: `/ads/${ad._id}/edit`, state: { isUpdate: true }}}> Edit </Link>
              </React.Fragment>
            }
            { wantDelete &&
              <div className='delete-menu'>
                Do you confirm?
                <button onClick={() => {this.deleteAd(ad._id, adIndex)}} className='btn btn-danger'> Yes </button>
                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> No </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

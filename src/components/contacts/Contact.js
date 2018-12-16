import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = (e) => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
    console.log(this.state.showContactInfo);
  };

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({type: 'DELETE_CONTACT', payload: id});

    // console.log('deleting - '+id );
  }

  render() {
    const {id, name, email, phone} = this.props.contact;
    const {showContactInfo} = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>{name} <i className="fas fa-sort-down" 
                onClick={this.onShowClick} 
                style={{ cursor: 'pointer' }} />
                <i className="fas fa-times" 
                  onClick={this.onDeleteClick.bind(this, id, dispatch)} 
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }} />
                  <Link to={`contact/edit/${id}`}>
                    <i className="fas fa-pencil-alt" 
                      style={{ cursor: 'pointer', float: 'right',
                          color: 'black', marginRight:'1rem', fontSize:'80%' }} />
                  </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          )}
        }
      </Consumer>
    )


  }
}

Contact.propTypes = { 
  contact: PropTypes.object.isRequired,
}

// Contact.propTypes = {
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
// }
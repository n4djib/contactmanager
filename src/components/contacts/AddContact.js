import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

export default class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Validatenpm insta
    let errors = {};
    let err = false;
    if(name === '') {
      errors = {...errors, name: 'Name is required'};
      this.setState({errors: errors});
      err = true;
    }
    if(email === '') {
      errors = {...errors, email: 'Email is required'};
      this.setState({errors: errors});
      err = true;
    }
    if(phone === '') {
      errors = {...errors, phone: 'Phone is required'};
      this.setState({errors: errors});
      err = true;
    }

    if(err)
      return;
    
    const newContact = {
      // id: uuid(), 
      name, email, phone 
    };

    // dispatch({type: 'ADD_CONTACT', payload: newContact});
    
    const res = await axios.post(
      `https://jsonplaceholder.typicode.com/users/`, 
      newContact);
    
    dispatch({type: 'ADD_CONTACT', payload: res.data});
    
    //clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    //redirect
    this.props.history.push('/');
  }


  onChange = e => this.setState({ 
    [e.target.name]: e.target.value });


  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  
                  <TextInputGroup 
                    label="Name" name="name" placeholder="Enter Name"
                    value={name} onChange={this.onChange}
                    error={errors.name}
                  />
                  
                  <TextInputGroup 
                    label="Email" name="email" placeholder="Enter Email"
                    type="email" value={email} onChange={this.onChange}
                    error={errors.email}
                  />
                  
                  <TextInputGroup 
                    label="Phone" name="phone" placeholder="Enter Phone"
                    value={phone} onChange={this.onChange}
                    error={errors.phone}
                  />
                  
                  <div className="form-group">
                    <input type="submit" value="Add Contact"
                      className="btn btn-light btn-block" />
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )


  }
}

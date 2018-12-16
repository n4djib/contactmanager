import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';
// import Contact from './Contact';

export default class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
    });
  }


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
    
    const updatedContact = {
    // id: uuid(), 
    name, email, phone 
    };


    const { id } = this.props.match.params;

    const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedContact);

    dispatch({type: 'UPDATE_CONTACT', payload: res.data});
    
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
              <div className="card-header">Edit Contact</div>
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
                    <input type="submit" value="Update Contact"
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

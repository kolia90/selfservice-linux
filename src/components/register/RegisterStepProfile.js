import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import routes from "../../constants/routes";
import RegisterStep from "./RegisterStep";
import APIService from "../../services/APIService";


class RegisterStepProfile extends Component {

  constructor(props){
    super(props);

    if(!this.props.user){
      console.log('User not found');
      this.props.history.push(`${routes.HOME}`)
    }
  }

  onSubmit = (value) => {
    let params = {};
    params[this.props.attr] = value;

    APIService.registerProfile(params, this.props.user.token, {
      context: this.props,
      onSuccess: (response) => {
        this.props.history.push(this.props.next)
      }, onError: () => {}
    })
  };

  onSkip = () => {
    this.props.history.push(`${routes.SERVICE}`)
  };

  render() {
    return (
      <RegisterStep
        onSubmit={this.onSubmit}
        onSkip={this.onSkip}
        showProcess={true}
        {...this.props}
      />
    );
  }
}


RegisterStepProfile.propTypes = {
  attr : PropTypes.string.isRequired,
  step : PropTypes.number.isRequired,
  next : PropTypes.string.isRequired,
  normalizeValue : PropTypes.func,
  placeholder : PropTypes.string,
  validator : PropTypes.func,
  title : PropTypes.string,
  lineWidth : PropTypes.number,
};


const mapStateToProps = state => ({user: state.userState});

export default connect(
    mapStateToProps,
)(withRouter(RegisterStepProfile))

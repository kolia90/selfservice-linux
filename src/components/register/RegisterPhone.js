import React, { Component } from "react";
import { connect } from 'react-redux'
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import RegisterStep from "./RegisterStep";
import { setLoading } from "../../store/actions";
import APIService from "../../services/APIService";


class RegisterPhone extends Component {

  validator = (value) => {
    if (value.length < 10){
      throw Error('Введите корректный номер телефона')
    }
    return value
  };

  onSubmit = (value) => {
    let phone = `+38${value}`;
    this.props.dispatch(setLoading(true));

    APIService.registerPhone(phone, {
      onSuccess: (response) => {
        this.props.dispatch(setLoading(false));

        this.props.history.push({
          pathname: `${routes.REGISTER_CODE}`,
          data: {
            phone: phone
          }
        })
      }, onError: () => {
        this.props.dispatch(setLoading(false));
      }
    })
  };

  onSkip = () => {
    this.props.history.push(`${routes.SERVICE}`)
  };

  render() {
    const inputSizePhoneNumber = this.props.dataState.value.length;

    return (
        <RegisterStep
            onSubmit={this.onSubmit}
            onSkip={this.onSkip}
            validator={this.validator}
            title={'Регистрация'}
            label={'Ваш номер телефона'}
            messageEmpty={'Введите номер телефона'}
            mask="999 999 99 99"
            clearNumber={true}
            preInput={
              <span>+38</span>
            }
            inputWrapClassName={'wrapper-input-phone'}
            inputSize={
              inputSizePhoneNumber < 10
                  ? inputSizePhoneNumber + 2
                  : 13
            }
            step={1}
        />
    );
  }
}


const mapStateToProps = state => ({
  dataState: state.dataState
});


export default connect(
    mapStateToProps,
)(withRouter(RegisterPhone))

import React, { Component } from "react";
import { connect } from 'react-redux'
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import RegisterStep from "./RegisterStep";
import APIService from "../../services/APIService";
import translation from "../../services/translation";


class RegisterPhone extends Component {

  validator = (value) => {
    if (value.length < 10){
      throw Error(
          translation({
            uk: "Введіть коректний номер телефону",
            ru: "Введите корректный номер телефона",
            en: "Enter а valid phone number"
          }, this.props.language)
      );
    }
    return value
  };

  onSubmit = (value) => {
    let phone = `+38${value}`;

    APIService.registerPhone(phone, {
      context: this.props,
      onSuccess: (response) => {
        this.props.history.push({
          pathname: `${routes.REGISTER_CODE}`,
          data: {
            phone: phone
          }
        })
      }, onError: () => {}
    })
  };

  onSkip = () => {
    this.props.history.push(`${routes.SERVICE}`)
  };

  render() {
    const value = this.props.dataState.value;
    const inputSizePhoneNumber = value ? value.length : 0;

    return (
        <RegisterStep
            onSubmit={this.onSubmit}
            onSkip={this.onSkip}
            validator={this.validator}
            title={
              translation({
                uk: "Реєстрація",
                ru: "Регистрация",
                en: "Registration"
              }, this.props.language)
            }
            label={
              translation({
                uk: "Ваш номер телефону",
                ru: "Ваш номер телефона",
                en: "Your phone number"
              }, this.props.language)
            }
            messageEmpty={
              translation({
                uk: "Введіть номер телефону",
                ru: "Введите номер телефона",
                en: "Enter your phone number"
              }, this.props.language)
            }
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
  dataState: state.dataState,
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterPhone))

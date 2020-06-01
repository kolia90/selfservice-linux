import React, { Component } from "react";
import { connect } from 'react-redux'
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import RegisterStep from "./RegisterStep";
import {setLevelNumber, setUserData} from "../../store/actions";
import APIService from "../../services/APIService";
import translation from "../../services/translation";


class RegisterCode extends Component {

  constructor(props){
    super(props);

    const { data } = this.props.location;
    this.phone = data ? data.phone : null;

    if(!this.phone){
      console.log('Phone number is lost');
      this.props.history.push(`${routes.REGISTER_PHONE}`)
    }
  }

  validator = (value) => {
    if (value.length < 6){
      throw Error(
          translation({
            uk: "Код повинен складатися з 6 символів",
            ru: "Код должен состоять из 6 символов",
            en: "The code need contain 6 symbols"
          }, this.props.language)
      )
    }
    return value
  };

  onSubmit = (code) => {
    APIService.registerConfirm(this.phone, code, {
      context: this.props,
      onSuccess: (response) => {
        this.props.dispatch(setUserData({
          token: response.data.auth_token,
          data: null
        }));
        this.props.dispatch(setLevelNumber(response.data.user.level_card_number));

        this.props.history.push(`${routes.REGISTER_FIRST_NAME}`)
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
            uk: "Введіть пароль з SMS",
            ru: "Введите пароль из SMS",
            en: "Enter the password from SMS"
          }, this.props.language)
        }
        messageEmpty={
          translation({
            uk: "Ви не ввели код",
            ru: "Вы не ввели код",
            en: "You don`t enter the code"
          }, this.props.language)
        }
        mask="9 9 9 9 9 9"
        clearNumber={true}
        maskChar="-"
        inputWrapClassName={'wrapper-input-password'}
        step={2}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterCode))

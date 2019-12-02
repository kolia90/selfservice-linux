import React, { Component } from "react";
import { connect } from 'react-redux'
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import RegisterStep from "./RegisterStep";
import {setLevelNumber, setLoading, setUserToken} from "../../store/actions";
import APIService from "../../services/APIService";


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
      throw Error('Код должен состоять из 6 символов')
    }
    return value
  };

  onSubmit = (code) => {
    this.props.dispatch(setLoading(true));

    APIService.registerConfirm(this.phone, code, {
      onSuccess: (response) => {
        this.props.dispatch(setLoading(false));
        this.props.dispatch(setUserToken(response.data.auth_token));
        this.props.dispatch(setLevelNumber(response.data.user.level_card_number));

        this.props.history.push(`${routes.REGISTER_FIRST_NAME}`)
      }, onError: () => {
        this.props.dispatch(setLoading(false));
      }
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
        title={'Регистрация'}
        label={'Введите пароль из SMS'}
        messageEmpty={'Вы не ввели пароль'}
        mask="9 9 9 9 9 9"
        clearNumber={true}
        maskChar="-"
        inputWrapClassName={'wrapper-input-password'}
        step={2}
      />
    );
  }
}


export default connect()(withRouter(RegisterCode))

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";
import {connect} from "react-redux";
import translation from "../../services/translation";


class RegisterEmail extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'email'}
        title={
          translation({
            uk: "Введіть ваш e-mail",
            ru: "Введите ваш e-mail",
            en: "Enter your email"
          }, this.props.language)
        }
        placeholder={'egor9881@mail.com'}
        maxLength={25}
        next={`${routes.REGISTER_FINISH}`}
        lineWidth={630}
        step={7}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterEmail))

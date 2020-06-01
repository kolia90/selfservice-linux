import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";
import translation from "../../services/translation";
import {connect} from "react-redux";


class RegisterLastName extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'last_name'}
        title={
          translation({
            uk: "Введіть фамілію",
            ru: "Введите фамилию",
            en: "Enter your last name"
          }, this.props.language)
        }
        placeholder={
          translation({
            uk: "Іванющенко",
            ru: "Иванющенко",
            en: "Doe"
          }, this.props.language)
        }
        maxLength={15}
        next={`${routes.REGISTER_BIRTHDAY}`}
        lineWidth={296}
        step={4}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterLastName))

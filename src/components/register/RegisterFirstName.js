import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";
import translation from "../../services/translation";
import {connect} from "react-redux";


class RegisterFirstName extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'first_name'}
        title={
          translation({
            uk: "Введіть ім'я",
            ru: "Введите имя",
            en: "Enter your first name"
          }, this.props.language)
        }
        placeholder={
          translation({
            uk: "Андрій",
            ru: "Андрей",
            en: "John"
          }, this.props.language)
        }
        maxLength={15}
        next={`${routes.REGISTER_LAST_NAME}`}
        lineWidth={185}
        step={3}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterFirstName))

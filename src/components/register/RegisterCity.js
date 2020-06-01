import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";
import translation from "../../services/translation";
import {connect} from "react-redux";


class RegisterCity extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'address'}
        title={
          translation({
            uk: "Введіть місто проживання",
            ru: "Введите город проживания",
            en: "Enter your city"
          }, this.props.language)
        }
        placeholder={
          translation({
            uk: "Київ",
            ru: "Киев",
            en: "Kyiv"
          }, this.props.language)
        }
        maxLength={25}
        next={`${routes.REGISTER_EMAIL}`}
        lineWidth={518}
        step={6}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterCity))

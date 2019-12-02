import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";


class RegisterCity extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'address'}
        title={'Введите город проживания'}
        placeholder={'Киев'}
        maxLength={25}
        next={`${routes.REGISTER_EMAIL}`}
        lineWidth={518}
        step={6}
      />
    );
  }
}

export default withRouter(RegisterCity)

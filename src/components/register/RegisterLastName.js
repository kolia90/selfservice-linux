import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";


class RegisterLastName extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'last_name'}
        title={'Введите фамилию'}
        placeholder={'Иванющенко'}
        maxLength={15}
        next={`${routes.REGISTER_BIRTHDAY}`}
        lineWidth={296}
        step={4}
      />
    );
  }
}

export default withRouter(RegisterLastName)

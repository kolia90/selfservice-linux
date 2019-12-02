import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";


class RegisterEmail extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'email'}
        title={'Введите ваш e-mail'}
        placeholder={'egor9881@mail.com'}
        maxLength={25}
        next={`${routes.REGISTER_FINISH}`}
        lineWidth={630}
        step={7}
      />
    );
  }
}

export default withRouter(RegisterEmail)

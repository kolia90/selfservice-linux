import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";


class RegisterFirstName extends Component {

  render() {
    return (
      <RegisterStepProfile
        attr={'first_name'}
        title={'Введите имя'}
        placeholder={'Андрей'}
        maxLength={15}
        next={`${routes.REGISTER_LAST_NAME}`}
        lineWidth={185}
        step={3}
      />
    );
  }
}

export default withRouter(RegisterFirstName)

// @flow
import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import constants from "./constants";
import SystemPassword from "./screen/SystemPassword";
import SystemMain from "./screen/SystemMain";
import SystemStep from "./SystemStep";


class SystemMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: constants.steps.PASSWORD,
    };
  }

  render() {
    return (
        <>
          {this.state.currentStep === constants.steps.PASSWORD && (
              <SystemStep>
                <SystemPassword onSuccess={() => {
                  this.setState({
                    currentStep: constants.steps.MAIN
                  })
                }} />
              </SystemStep>
          )}

          {this.state.currentStep === constants.steps.MAIN && (
              <SystemStep>
                <SystemMain />
              </SystemStep>
          )}
        </>
    );
  }
}

export default withRouter(SystemMenu);

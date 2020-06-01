import React from "react";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";
import "./FuelStep.scss";
import MultiLang from "../../MultiLang";

class FuelStep extends React.Component {

  navPrev = () => {
    if(this.props.navPrev){
      this.props.navPrev()
    }else{
      if (this.props.screen === 1) {
        this.props.history.goBack();
      } else {
        this.props.setScreen(this.props.screen - 1);
      }
    }
  };

  render() {
    return (
        <>
          <Header
              left={<PreviousPage onClick={() => this.navPrev()} />}
              center={<div>{this.props.title || (
                  <MultiLang>
                    {{
                      uk: "Покупка пального",
                      ru: "Покупка топлива",
                      en: "Buy the fuel"
                    }}
                  </MultiLang>
              )}</div>}
              right={null}
          />
          <div className="wrapper-fuel-purchase" data-tid="container">
            {this.props.children}
          </div>
        </>
    );
  }
}

export default withRouter(FuelStep);

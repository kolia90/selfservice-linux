import React from "react";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";
import "./FuelPurchase.scss";

class FuelStep extends React.Component {

  navPrev = () => {
    if (this.props.screen === 1 || this.props.screen === 5) {
      this.props.history.goBack();
    } else {
      this.props.setScreen(this.props.screen - 1);
    }
  };

  render() {
    return (
        <>
          <Header
              left={<PreviousPage onClick={() => this.navPrev()} />}
              center={<div>{this.props.title || 'ПОКУПКА ТОПЛИВА'}</div>}
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

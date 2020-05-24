import React from "react";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";

class CheckoutStep extends React.Component {

  navPrev = () => {
    if(this.props.navPrev){
      this.props.navPrev()
    }else{
      this.props.history.goBack();
    }
  };

  render() {
    return (
        <>
          <Header
              left={<PreviousPage onClick={() => this.navPrev()} />}
              center={<div>{this.props.title || 'Выберите способ оплаты'}</div>}
              right={null}
          />
          <div className="wrapper-checkout">{this.props.children}</div>
        </>
    );
  }
}

export default withRouter(CheckoutStep);

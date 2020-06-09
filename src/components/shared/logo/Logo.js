// @flow
import React, {Component} from "react";
import "./Logo.scss";
import { withRouter } from "react-router-dom";
import routes from "../../../constants/routes";


class Logo extends Component {

  constructor(props){
    super(props);
    this.timer = null;
    this.counter = 0;
  }

  counterClick(){
    if (!this.timer){
      this.counter = 1;
      this.timer = setTimeout(() => {
        this.timer = null;
      }, 1200)
    }else{
      this.counter += 1;
      if (this.counter >= 7){
        clearTimeout(this.timer);
        this.timer = null;
        this.onClicked()
      }
    }
  }

  onClicked = () => {
    this.props.history.push(`${routes.SYSTEM_MENU}`);
  };

  handleClick = (e) => {
    if(this.props.location.pathname === "/"){
      this.counterClick()
    }else{
      this.props.history.push("/")
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return (
      <div className="wrapper-logo">
        <img
          className="img-logo"
          src={require("../../../images/logo/logo.svg")}
          alt="Socar"
          onClick={this.handleClick}
        />
        <div className="version">v0.2.3</div>
      </div>
    );
  }
}

export default withRouter(Logo);

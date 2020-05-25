import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import "./Slider.scss";
import routes from "../../../constants/routes";

export default class Slider extends Component {
  state = { index: 0 };

  componentDidMount() {
    var intervalId = setInterval(this.timer, 5000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    if (this.props.children.length - 1 > this.state.index) {
      this.setState({ index: this.state.index + 1 });
    } else {
      this.setState({ index: 0 });
    }
  };

  dotClicked = index => {
    this.setState({ index });
  };

  render() {
    return (
      <div className="slider-container">
        <NavLink to={routes.CHECK_CARD}>
          <div
            className="slider-inner-container"
            style={{ left: -100 * this.state.index + "%" }}>
            {this.props.children.map((child, index) => (
              <div key={index}>{child}</div>
            ))}
          </div>
        </NavLink>
        <div className="slider-dots">
          {this.props.children.map((child, index) => (
            <div
              key={index}
              data-index={index}
              onClick={e =>
                e && this.dotClicked(parseInt(e.target.dataset.index, 10))
              }
            >
              {index === this.state.index ? (
                <span className="active" />
              ) : (
                <span className="no-active" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// @flow
import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import ReactLoader from 'react-loader-spinner'
import "./Loader.scss";


class Loader extends Component {
  render() {
    return (
      <ReactLoader
          type="Watch"
          color="#ffffff"
          className="wrapper-loading"
          height={100}
          width={100}
          visible={this.props.visible}
      />
    )
  }
}

const mapStateToProps = state => ({
  visible: state.loadingState
});


export default connect(
    mapStateToProps,
)(withRouter(Loader))

// @flow
import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { DateTime } from "luxon"
import H1 from "../shared/h1/H1";
import MPosService from "../../services/MPosService";
import "./Zreport.scss";
import MultiLang from "../../MultiLang";
import Header from "../shared/header/Header";

class Zreport extends Component {

  CONST = {
    STORAGE_KEY: 'z-report',
    DATE_FORMAT: 'dd.MM.yyyy',
    REGEX: /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/,
    START_TIME: '23:50:00',
    END_TIME: null,
  };

  constructor(props){
    super(props);
    this.timer = null;

    this.state = {
      inProcess: false
    }
  }

  checkTodayRun() {
    const date = DateTime.local().toFormat(this.CONST.DATE_FORMAT);
    const value = localStorage.getItem(this.CONST.STORAGE_KEY);
    return date === value
  }

  run() {
    const date = DateTime.local().toFormat(this.CONST.DATE_FORMAT);
    localStorage.setItem(this.CONST.STORAGE_KEY, date);

    MPosService.shiftProc(MPosService.CONST.PROC_Z_REPORT, {
      loading: false,
      context: this.props,
      onError: () => {}
    })
  }

  timeToInt = (time) => {
    return time && parseInt(time.replace(this.CONST.REGEX, "$1$2$3"))
  };

  checkStep() {
    const isAlreadyRun = this.checkTodayRun();
    const nowInt = this.timeToInt(DateTime.local().toFormat('HH:mm:ss'));
    const startInt = this.timeToInt(this.CONST.START_TIME);
    const endInt = this.timeToInt(this.CONST.END_TIME);

    if ((nowInt >= startInt) && (!endInt || (nowInt <= endInt))){
      this.setState({
        inProcess: true
      });
      if (!isAlreadyRun) this.run()
    }else {
      this.setState({
        inProcess: false
      })
    }
  }

  runTimer() {
    this.timer = setTimeout(() => {
      this.checkStep();
      this.runTimer();
    }, 5000)
  }

  componentDidMount() {
    this.checkStep();
    this.runTimer()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return (
        this.state.inProcess ? (
            <div className="wrapper-z-report">
              <Header />

              <div className="z-report">
                <H1 text={
                  <MultiLang>
                    {{
                      uk: "Технічна перерва...",
                      ru: "Технический перерыв...",
                      en: "Technical break..."
                    }}
                  </MultiLang>
                }/>
                <img src={require("../../images/zreport/tools.svg")} alt="" />
              </div>
            </div>
        ) : (<></>)
    )
  }
}

export default connect()(withRouter(Zreport))

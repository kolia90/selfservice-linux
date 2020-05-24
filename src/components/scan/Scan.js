import React from "react";
import { connect } from 'react-redux'
import Header from "../shared/header/Header";
import Skip from "../shared/skip/Skip";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import "./Scan.scss";
import Toast from "../shared/toast/Toast";
import APIService from "../../services/APIService";
import {setUserData, setLevelNumber, setLoading} from "../../store/actions";


class Scan extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      typing: false,
      value: null,
    };
    this.id = null;
  }

  finishTyping = () => {
    const value = this.state.value;
    clearTimeout(this.id);

    this.setState({
      value: null,
      typing: false,
    });

    this.props.dispatch(setLoading(true));

    APIService.findByLevel(value, {
      onSuccess: (response) => {
        this.props.dispatch(setLoading(false));
        const data = response.data;
        this.props.dispatch(setLevelNumber(data.number));
        data.user_data && this.props.dispatch(setUserData({
          token: data.user_data.auth_token,
          data: data.user_data.user
        }));

        this.props.history.push(`${routes.SERVICE}`)
      }, onError: () => {
        this.props.dispatch(setLoading(false));
      }
    })
  };

  handleKeyUp = (e) => {
    e.preventDefault();
    if (e.keyCode === 40) return;
    if (e.keyCode === 13) return this.finishTyping();

    this.setState({
      typing: true
    });

    const value = this.state.value ? this.state.value + e.key : e.key;
    this.setState({
      value: value
    });
  };

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const changedTyping = prevState.typing !== this.state.typing;

    if (changedTyping && this.state.typing){
      this.id = setTimeout(() => {
        Toast('Просканируйте LEVEL карту');
        this.setState({
          value: null,
          typing: false,
        });
      }, 1000)
    }
  }

  render(){
    return (
        <div>
          <Header
              center={<div>СКАНИРОВАНИЕ</div>}
              right={<Skip onSkip={() => this.props.history.push(`${routes.SERVICE}`)} />}
          />
          <div className="scan">
            <div className="qr" />
            <div className="square">
              <img
                  className="tl"
                  src={require("../../images/scan/rectangle-2.svg")}
                  alt=""
              />
              <img
                  className="tr"
                  src={require("../../images/scan/rectangle-2.svg")}
                  alt=""
              />
              <img
                  className="bl"
                  src={require("../../images/scan/rectangle-2.svg")}
                  alt=""
              />
              <img
                  className="br"
                  src={require("../../images/scan/rectangle-2.svg")}
                  alt=""
              />
            </div>
          </div>
        </div>
    );
  }
}

export default connect()(withRouter(Scan))

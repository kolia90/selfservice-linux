import React from "react";
import { connect } from 'react-redux'
import Header from "../shared/header/Header";
import Skip from "../shared/skip/Skip";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import "./Scan.scss";
import Toast from "../shared/toast/Toast";
import APIService from "../../services/APIService";
import {setUserData, setLevelNumber} from "../../store/actions";
import MultiLang from "../../MultiLang";


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


    APIService.findByLevel(value, {
      context: this.props,
      onSuccess: (response) => {
        const data = response.data;
        this.props.dispatch(setLevelNumber(value));
        data.user_data && this.props.dispatch(setUserData({
          token: data.user_data.auth_token,
          data: data.user_data.user
        }));

        this.props.history.push(`${routes.SERVICE}`)
      }, onError: () => {}
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
        Toast(<MultiLang>
          {{
            uk: "Проскануйте LEVEL карту",
            ru: "Просканируйте LEVEL карту",
            en: "Please scan LEVEL card"
          }}
        </MultiLang>);
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
              center={<div>
                <MultiLang>
                  {{
                    uk: "Сканування",
                    ru: "Сканирование",
                    en: "Scan"
                  }}
                </MultiLang>
              </div>}
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

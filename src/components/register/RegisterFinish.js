import React, {Component} from "react";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import bwipjs from 'bwip-js';
import formatStringByPattern from 'format-string-by-pattern';
import H2 from "../shared/h2/H2";
import Button from "../shared/button/Button";
import Logo from "../shared/logo/Logo";
import routes from "../../constants/routes";
import APIService from "../../services/APIService";
import "./RegisterFinish.scss";
import MultiLang from "../../MultiLang";


class RegisterFinish extends Component {

  constructor(props){
    super(props);

    this.state = {
      number: null,
      balance: null
    };

    if(!this.props.user){
      this.props.history.push(`${routes.HOME}`)
    }
  }

  componentDidMount = () => {
    if(!this.props.user) return;

    APIService.getLevel(this.props.user.token, {
      context: this.props,
      onSuccess: (response) => {
        this.setState({
          number: formatStringByPattern('9999 9999 9999 9999', response.data.number),
          balance:  response.data.balance
        });

        this.generateBarCode(response.data.number)

      }, onError: () => {}
    });
  };

  generateBarCode = (text) => {
    bwipjs('barcode', {
      bcid: 'pdf417', // Barcode type
      text: text, // Text to encode
      scale: 3, // 3x scaling factor
      height: 7, // Bar height, in millimeters
      textxalign: 'center', // Always good to set this
    }, function (err, cvs) {});
  };

  render() {
    return (
        <>
          <Header center={<div>
            <MultiLang>
              {{
                uk: "Завершення",
                ru: "Завершение",
                en: "Finish"
              }}
            </MultiLang>
          </div>} right={null} />
          <div className="wrapper-register-finish">
            <div className="level-card">
              <div className="wrapper-header">
                <div className="float-l name">
                  <MultiLang>
                    {{
                      uk: "LEVEL card",
                      ru: "LEVEL card",
                      en: "LEVEL card"
                    }}
                  </MultiLang>
                </div>
                <div className="float-r">
                  <Logo />
                </div>
                <div className="clearfix" />
              </div>
              <div className="number">№ {this.state.number}</div>
              <div className="barcode">
                <canvas id="barcode" />
              </div>
              <div className="wrapper-balance">
                <div className="balance">
                  <span>
                    <MultiLang>
                      {{
                        uk: `Баланс: ${this.state.balance} гривень`,
                        ru: `Баланс: ${this.state.balance} гривен`,
                        en: `Balance: ${this.state.balance} uah`
                      }}
                    </MultiLang>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <H2 text={
                <MultiLang>
                  {{
                    uk: "Вам згенерована віртуальна карта LEVEL! Вона доступна вам в мобільному додатку.",
                    ru: "Вам сгенерирована виртуальная карта LEVEL! Она доступна вам в мобильном приложении.",
                    en: "A LEVEL virtual card has been generated for you! It is available to you in the mobile application."
                  }}
                </MultiLang>
              } />
            </div>
            <div className="wrapper-mobile-app">
              <div className="float-l">
                <img
                    src={require("../../images/register-card-finish/app-store-but.svg")}
                    alt="App Stote"
                />
              </div>
              <div className="float-r">
                <img
                    src={require("../../images/register-card-finish/google-play-but.svg")}
                    alt="Google Play"
                />
              </div>
            </div>
            <div className="clearfix" />
            <Button
                title={
                  <MultiLang>
                    {{
                      uk: "Почати використання",
                      ru: "Начать использование",
                      en: "Start use"
                    }}
                  </MultiLang>
                }
                onClick={() => this.props.history.push(`${routes.SERVICE}`)}
            />
          </div>
        </>
    );
  }
}

const mapStateToProps = state => ({user: state.userState});

export default connect(
    mapStateToProps,
)(withRouter(RegisterFinish))

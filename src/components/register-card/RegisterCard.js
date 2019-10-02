import React, { Component } from "react";
import routes from "../../constants/routes";
import "./RegisterCard.scss";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import InputMask from "react-input-mask";
import "react-simple-keyboard/build/css/index.css";
import H2 from "../shared/h2/H2";
import Input from "../shared/input/Input";
import Button from "../shared/button/Button";
import Keyboard from "../shared/keyboard/Keyboard";
import RegisterLine from "../shared/register-line/RegisterLine";
import Skip from "../shared/skip/Skip";

class RegisterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      registerLineSvg: false,
      numberPhone: "adf",
      value: "",
      password: "",
      title: "РЕГИСТРАЦИЯ",
      showKeyboard: true,
      user: {
        phoneNumber: " ",
        name: "",
        surname: "",
        dateOfBirth: "",
        city: "",
        email: ""
      }
    };
  }

  onChange = input => {
    let newStateUser = {};

    if (this.state.currentStep === 1) {
      if (input.length > 10) return null;
      newStateUser = {
        phoneNumber: input
      };
    } else if (this.state.currentStep === 2) {
      newStateUser = {
        password: input
      };
    } else if (this.state.currentStep === 3) {
      newStateUser = {
        name: input
      };
    } else if (this.state.currentStep === 4) {
      newStateUser = {
        surname: input
      };
    } else if (this.state.currentStep === 5) {
      newStateUser = {
        dateOfBirth: input
      };
    } else if (this.state.currentStep === 6) {
      newStateUser = {
        city: input
      };
    } else if (this.state.currentStep === 7) {
      newStateUser = {
        email: input
      };
    }

    this.setState({
      user: { ...this.state.user, ...newStateUser }
    });
  };

  handleChange = e => {
    this.setState(
      {
        value: e.target.value
      },
      () => {
        this.keyboardRef.keyboard.setInput(e.target.value);
      }
    );
  };

  nextStep = () => {
    this.setState(
      {
        currentStep: this.state.currentStep + 1,
        showKeyboard: false
      },
      () => {
        const { currentStep } = this.state;
        let title = this.state.title;

        if (currentStep === 3) {
          title = "ВВЕДИТЕ ИМЯ";
        } else if (currentStep === 4) {
          title = "ВВЕДИТЕ ФАМИЛИЮ";
        } else if (currentStep === 5) {
          title = "ВВЕДИТЕ ДАТУ РОЖДЕНИЯ";
        } else if (currentStep === 6) {
          title = "ВВЕДИТЕ ГОРОД ПРОЖИВАНИЯ";
        } else if (currentStep === 7) {
          title = "ВВЕДИТЕ ВАШ E-MAIL";
        } else if (currentStep === 8) {
          title = "ЗАВЕРШЕНИЕ";
        }

        this.setState({
          title,
          showKeyboard: true
        });
      }
    );
  };

  setRegisterLineSvg = () => {
    this.setState({
      registerLineSvg: true
    });
  };

  render() {
    const inputSizePhoneNumber = this.state.user.phoneNumber.length;
    return (
      <>
        <Header
          center={<div>{this.state.title}</div>}
          right={
            <Skip
              onSkip={() =>
                this.setState({
                  currentStep: this.state.currentStep + 1
                })
              }
            />
          }
        />

        <div className="wrapper-register">
          {this.state.currentStep === 1 && (
            <>
              <div className="wrapper-form">
                <H2 text="Ваш номер телефона" />
                <form>
                  <div className="wrapper-input-phone">
                    <span>+38</span>
                    <InputMask
                      size={
                        inputSizePhoneNumber < 10
                          ? inputSizePhoneNumber + 2
                          : 13
                      }
                      handleChange={this.handleChange}
                      value={this.state.user.phoneNumber}
                      mask="999 999 99 99"
                      maskChar={false}
                      alwaysShowMask="true"
                    />
                    <div />
                  </div>
                </form>
              </div>
            </>
          )}

          {this.state.currentStep === 2 && (
            <>
              <div className="wrapper-form">
                <H2 text="Введите пароль из SMS" />
                <div className="wrapper-input-password">
                  <InputMask
                    mask="9 9 9 9 9 9"
                    maskChar="-"
                    alwaysShowMask="true"
                    value={this.state.user.password}
                  />
                </div>
              </div>
            </>
          )}

          {this.state.currentStep === 3 && (
            <>
              <div className="wrapper-form">
                <RegisterLine
                  registerLineSvg={this.state.registerLineSvg}
                  setRegisterLineSvg={() => this.setRegisterLineSvg()}
                  currentStep={this.state.currentStep}
                  processActiveWidth={185}
                />
                <Input
                  className="input"
                  handleChange={this.handleChange}
                  value={this.state.user.name}
                  placeholder="Андрей"
                />
              </div>
            </>
          )}

          {this.state.currentStep === 4 && (
            <>
              <div className="wrapper-form">
                <RegisterLine
                  registerLineSvg={this.state.registerLineSvg}
                  setRegisterLineSvg={() => this.setRegisterLineSvg()}
                  currentStep={this.state.currentStep}
                  processActiveWidth={296}
                />
                <Input
                  className="input"
                  handleChange={this.handleChange}
                  value={this.state.user.surname}
                  placeholder="Иванющенк"
                />
              </div>
            </>
          )}

          {this.state.currentStep === 5 && (
            <>
              <div className="wrapper-form">
                <RegisterLine
                  registerLineSvg={this.state.registerLineSvg}
                  setRegisterLineSvg={() => this.setRegisterLineSvg()}
                  currentStep={this.state.currentStep}
                  processActiveWidth={407}
                />
                <div className="wrapper-input">
                  <InputMask
                    className="input"
                    mask="s9/vl/l999"
                    formatChars={{
                      9: "['0-9']",
                      s: "['0-3']",
                      l: "['0-2']",
                      v: "['0-1']"
                    }}
                    alwaysShowMask="true"
                    placeholder="дд/мм/гггг"
                    handleChange={this.handleChange}
                    value={this.state.user.dateOfBirth}
                    maskChar={null}
                  />
                </div>
              </div>
            </>
          )}

          {this.state.currentStep === 6 && (
            <>
              <div className="wrapper-form">
                <RegisterLine
                  registerLineSvg={this.state.registerLineSvg}
                  setRegisterLineSvg={() => this.setRegisterLineSvg()}
                  currentStep={this.state.currentStep}
                  processActiveWidth={518}
                />
                <Input
                  handleChange={this.handleChange}
                  value={this.state.user.city}
                  placeholder="Киев"
                />
              </div>
            </>
          )}

          {this.state.currentStep === 7 && (
            <>
              <div className="wrapper-form">
                <RegisterLine
                  registerLineSvg={this.state.registerLineSvg}
                  setRegisterLineSvg={() => this.setRegisterLineSvg()}
                  currentStep={this.state.currentStep}
                  processActiveWidth={630}
                />
                <Input
                  type="email"
                  handleChange={this.handleChange}
                  value={this.state.user.email}
                  placeholder="egor9881@mail.com"
                />
              </div>
            </>
          )}

          <div className="wrapper-button">
            {this.state.currentStep === 7 ? (
              <Button
                title="Готово"
                onClick={() =>
                  this.props.history.push(`${routes.REGISTER_CARD_FINISH}`)
                }
              />
            ) : (
              <Button title="Далее" onClick={this.nextStep} />
            )}
          </div>

          <div className="wrapper-keyboard">
            {this.state.showKeyboard && (
              <Keyboard onChange={input => this.onChange(input)} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(RegisterCard);

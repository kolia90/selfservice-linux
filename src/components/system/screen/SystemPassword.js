import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Keyboard from "../../shared/keyboard/Keyboard";
import H2 from "../../shared/h2/H2";
import Button from "../../shared/button/Button";
import MultiLang from "../../../MultiLang";
import './SystemPassword.scss'
import Toast from "../../shared/toast/Toast";
import {setDataValue} from "../../../store/actions";
const config = require('../../../settings/config');


class SystemPassword extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.keyboardRef = null;
    this.inputRef = null;
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({value: value}, () => {
      this.keyboardRef.keyboard.setInput(value);
    });
  };

  onChange = input => {
    this.setState({
      value: input
    });
  };

  onSubmit = () => {
    if(this.state.value === config.systemPassword){
      this.onSuccess()
    }else {
      Toast(
          <MultiLang>
            {{
              uk: "Невірний пароль",
              ru: "Неверный пароль",
              en: "Invalid password"
            }}
          </MultiLang>
      )
    }
  };

  onSuccess = () => {
    this.props.onSuccess && this.props.onSuccess()
  };

  render(){
    return (
        <div className="container">

          <div className="wrapper-form">
            <H2 text={
              <MultiLang>
                {{
                  uk: "Введіть пароль:",
                  ru: "Введите пароль:",
                  en: "Select password:"
                }}
              </MultiLang>
            } />

            <div className={'wrapper-input'}>
              <input type="password" placeholder={'******'}
                     className="input" onChange={this.handleChange} value={this.state.value} />
            </div>
          </div>

          <div className="wrapper-button center">
            <Button title={
                <MultiLang>
                  {{
                    uk: "Дальше",
                    ru: "Далее",
                    en: "Next"
                  }}
                </MultiLang>
            } onClick={this.onSubmit} />
          </div>

          <div className="wrapper-keyboard">
              <Keyboard
                  onRef={r => this.keyboardRef = r}
                  onChange={input => this.onChange(input)} />
          </div>
        </div>
    );
  }
}


export default connect()(withRouter(SystemPassword))

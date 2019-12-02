import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import Header from "../shared/header/Header";
import Button from "../shared/button/Button";
import Keyboard from "../shared/keyboard/Keyboard";
import Skip from "../shared/skip/Skip";
import RegisterLine from "../shared/register-line/RegisterLine";
import PropTypes from 'prop-types';
import H2 from "../shared/h2/H2";
import InputMask from "react-input-mask";
import Toast from "../shared/toast/Toast";
import { setDataValue } from '../../store/actions'
import "./Register.scss";


class RegisterStep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registerLineSvg: false,
      showKeyboard: true,
      loading: true,
      value: '',
    };
    this.inputRef = null;
  }

  changeValue = value => {
    this.setState({value: value}, () => {
      let v = this.handleValue(this.inputRef.value);
      this.keyboardRef.keyboard.setInput(v);
      this.props.dispatch(setDataValue(v));
    });
  };

  handleValue = value => {
    value = this.props.clearNumber ? value.replace(/[^0-9]/g, '') : value;
    value = this.props.clearSpace ? value.replace(/\s/g, '') : value;
    value = this.props.clear ? this.props.clear(value) : value;
    return value
  };

  onChange = input => {
    this.changeValue(input)
  };

  handleChange = e => {
    this.changeValue(e.target.value);
  };

  setRegisterLineSvg = () => {
    this.setState({
      registerLineSvg: true
    });
  };

  onSubmit = () => {
    let value = this.props.dataState.value;

    if (!value.length){
      Toast(this.props.messageEmpty || this.props.title);
      return
    }

    if (this.props.validator){
      try {
        value = this.props.validator(value)
      } catch (e) {
        Toast(e.message);
        return
      }
    }

    this.props.onSubmit && this.props.onSubmit(value)
  };

  render() {
    return (
      <>
        <Header
            center={<div>{this.props.title}</div>}
            right={
              <Skip onSkip={() =>
                  this.props.onSkip && this.props.onSkip()
              }/>
            }
        />

        <div className="wrapper-register">
          <div className="wrapper-form">
            {this.props.showProcess && (
              <RegisterLine
                  registerLineSvg={this.state.registerLineSvg}
                  setRegisterLineSvg={() => this.setRegisterLineSvg()}
                  currentStep={this.props.step}
                  processActiveWidth={this.props.lineWidth || 185}
              />
            )}
            {this.props.label && (
                <H2 text={this.props.label} />
            )}
            <div className={this.props.inputWrapClassName}>
              {this.props.preInput}
              <InputMask
                  size={this.props.inputSize}
                  className="input"
                  mask={this.props.mask || (this.props.maxLength ? '*'.repeat(this.props.maxLength) : null)}
                  maskChar={this.props.maskChar || ''}
                  formatChars={this.props.formatChars || {
                    '9': '[0-9]',
                    'a': '[A-zА-я]',
                    '*': '.'
                  }}
                  alwaysShowMask={true}
                  placeholder={this.props.placeholder || null}
                  onChange={this.handleChange}
                  value={this.state.value}
                  inputRef={r => this.inputRef = r}
              />
            </div>
          </div>

          <div className="wrapper-button">
            <Button title={this.props.submit || 'Далее'} onClick={this.onSubmit} />
          </div>

          <div className="wrapper-keyboard">
            {this.state.showKeyboard && (
                <Keyboard
                    onRef={r => this.keyboardRef = r}
                    onChange={input => this.onChange(input)} />
            )}
          </div>
        </div>
      </>
    );
  }
}

RegisterStep.propTypes = {
  onSubmit : PropTypes.func.isRequired,
  onSkip : PropTypes.func.isRequired,
  validator : PropTypes.func,
  clear : PropTypes.func,
  title : PropTypes.string,
  label : PropTypes.string,
  mask : PropTypes.string,
  maskChar : PropTypes.string,
  formatChars : PropTypes.object,
  placeholder : PropTypes.string,
  maxLength : PropTypes.number,
  inputSize : PropTypes.number,
  messageEmpty : PropTypes.string,
  preInput : PropTypes.node,
  inputWrapClassName : PropTypes.string,
  showProcess : PropTypes.bool,
  lineWidth : PropTypes.number,
  clearNumber : PropTypes.bool,
  clearSpace : PropTypes.bool,
};

const mapStateToProps = state => ({
  dataState: state.dataState
});

export default connect(mapStateToProps)(withRouter(RegisterStep));

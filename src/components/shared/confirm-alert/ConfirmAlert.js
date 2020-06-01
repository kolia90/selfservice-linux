// @flow
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import "./ConfirmAlert.scss";
import translation from "../../../services/translation";
import {connect} from "react-redux";


class ConfirmAlert extends Component {

  handleValue(value){
    if (typeof value === 'object') return translation(value, this.props.language);
    return value || null
  }

  confirm = () => {
    confirmAlert({
      title: this.handleValue(this.props.title) || translation(
          {
            uk: "Підтвердити дію",
            ru: "Подтвердить действие",
            en: "Confirm action"
          }, this.props.language
      ),
      message: this.handleValue(this.props.message) || translation(
          {
            uk: "Ви впевнені?",
            ru: "Вы уверены?",
            en: "Are you sure?"
          }, this.props.language
      ),
      buttons: [
        {
          label: this.handleValue(this.props.btnYes) || translation(
              {
                uk: "Так",
                ru: "Да",
                en: "Yes"
              }, this.props.language
          ),
          onClick: () => this.props.onConfirm()
        },
        {
          label: this.handleValue(this.props.btnNo) || translation(
              {
                uk: "Ні",
                ru: "Нет",
                en: "No"
              }, this.props.language
          ),
          onClick: () => this.props.onCancel && this.props.onCancel()
        }
      ]
    });
  };

  render() {
    return (
      <div className={this.props.className || ''} onClick={this.confirm}>
        {this.props.children}
      </div>
    )
  }
}


ConfirmAlert.propTypes = {
  title : PropTypes.any,
  message : PropTypes.any,
  onConfirm : PropTypes.func.isRequired,
  onCancel : PropTypes.func,
  btnYes : PropTypes.any,
  btnNo : PropTypes.any,
};

const mapStateToProps = state => ({
  language: state.languageState,
});
export default connect(mapStateToProps)(ConfirmAlert)

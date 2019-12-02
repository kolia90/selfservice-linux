// @flow
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import "./ConfirmAlert.scss";


class ConfirmAlert extends Component {
  confirm = () => {
    confirmAlert({
      title: this.props.title || 'Подтвердить действие',
      message: this.props.message || 'Вы уверены?',
      buttons: [
        {
          label: this.props.btnYes || 'Да',
          onClick: () => this.props.onConfirm()
        },
        {
          label: this.props.btnNo || 'Нет',
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
  title : PropTypes.string,
  message : PropTypes.string,
  onConfirm : PropTypes.func.isRequired,
  onCancel : PropTypes.func,
  btnYes : PropTypes.string,
  btnNo : PropTypes.string,
};

export default ConfirmAlert

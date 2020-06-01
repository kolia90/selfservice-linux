import React, { Component } from "react";
import { DateTime } from 'luxon'
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";
import translation from "../../services/translation";
import {connect} from "react-redux";


class RegisterBirthday extends Component {

  // формат саме такий, тому що ми очищаємо від "/"
  // для корректного видалення на Backspace віртуальної клавіатури
  formatInputDate = 'ddMMyyyy';
  formatServerDate = 'yyyy-MM-dd';

  formatDate = (dateObject, luxonFormat) => {
    return DateTime.fromJSDate(dateObject)
        .toFormat(luxonFormat)
  };

  parseDate = (dateString, format) => {
    return DateTime
        .fromFormat(dateString, format)
        .toJSDate()
  };

  validator = value => {
    let d = this.parseDate(value, this.formatInputDate);
    if (!d.getDate()){
      throw Error(
          translation({
            uk: "Введіть правильную дату",
            ru: "Введите правильную дату",
            en: "Enter a valid date"
          }, this.props.language)
      );
    }
    return this.formatDate(d, this.formatServerDate)
  };

  clear = value => {
    return value.replace(/\//g, '')
  };

  render() {
    return (
      <RegisterStepProfile
        validator={this.validator}
        clear={this.clear}
        attr={'birthday'}
        title={
          translation({
            uk: "Введіть дату народження",
            ru: "Введите дату рождения",
            en: "Enter the date of birth"
          }, this.props.language)
        }
        next={`${routes.REGISTER_CITY}`}
        mask="s9/v9/l999"
        formatChars={{
          9: "['0-9']",
          s: "['0-3']",
          l: "['0-2']",
          v: "['0-1']"
        }}
        placeholder="дд/мм/гггг"
        lineWidth={407}
        step={5}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});

export default connect(mapStateToProps)(withRouter(RegisterBirthday))

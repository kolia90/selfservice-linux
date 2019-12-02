import React, { Component } from "react";
import { DateTime } from 'luxon'
import { withRouter } from "react-router-dom";
import RegisterStepProfile from "./RegisterStepProfile";
import routes from "../../constants/routes";


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
      throw Error('Введите правильную дату');
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
        title={'Введите дату рождения'}
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


export default withRouter(RegisterBirthday)

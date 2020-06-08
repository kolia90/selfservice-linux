import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Button from "../../shared/button/Button";
import MultiLang from "../../../MultiLang";
import './SystemMain.scss'
import MPosService from "../../../services/MPosService";
import Toast from "../../shared/toast/Toast";


class SystemMain extends React.Component{

  handleZReport = () => {
    MPosService.shiftProc(MPosService.CONST.PROC_Z_REPORT, {
      timeout: 5,
      loading: true,
      context: this.props,
      onTimeout: () => {
        Toast(
            <MultiLang>
              {{
                uk: "Сервер не відповідає",
                ru: "Сервер не отвечает",
                en: "Server timeout"
              }}
            </MultiLang>
        )
      },
      onError: () => {},
    })
  };

  render(){
    return (
        <div className="container">
          <div className="wrapper-main">
            <Button title={
              <MultiLang>
                {{
                  uk: "Z-звіт",
                  ru: "Z-отчет",
                  en: "Z-report"
                }}
              </MultiLang>
            } onClick={this.handleZReport} />
          </div>
        </div>
    );
  }
}


export default connect()(withRouter(SystemMain))

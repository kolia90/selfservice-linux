import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import H2 from "../../shared/h2/H2";
import Button from "../../shared/button/Button";
import MPosService from "../../../services/MPosService";
import mPosHelper from "../../../helpers/mPosHelper";
import Toast from "../../shared/toast/Toast";
import "./FuelPurchaseScreen2.scss";
import MultiLang from "../../../MultiLang";


class FuelPurchaseScreen2 extends React.Component {

  onSubmit = () => {
    MPosService.getDispenserStatus(this.props.number, {
      context: this.props,
      notifyDisabled: true,
      onSuccess: (data) => {
        mPosHelper.handleGetStatus(data, {
          onUp: (fuelData) => {
            this.props.setFuel(fuelData, () => {
              this.props.setScreen(3);
            })
          },
          onDown: () => {
            Toast(
                <MultiLang>
                  {{
                    uk: "Вставте пістолет в бак і повторіть операцію",
                    ru: "Вставте пистолет в бак и повторите операцию",
                    en: "Insert the gun into the tank and repeat the operation"
                  }}
                </MultiLang>
            );
          }
        });
      }
    })
  };

  render(){
    return (
        <div className="wrapper-screen-2">
          <div className="wrapper-img">
            <img src={require("../../../images/fuel-purchase/image-2.png")} alt="" />
          </div>

          <div className="wrapper-h2">
            <H2 text={
              <MultiLang>
                {{
                  uk: "Переконайтесь, що запровочний пістолет вставлений в горловину вашого баку автомобіля",
                  ru: "Убедитесь, что заправочный пистолет вставлен в горловину бака вашего автомобиля",
                  en: "Make sure the gun is inserted into yours car tank"
                }}
              </MultiLang>
            } />
          </div>

          <div className="wrapper-button">
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
        </div>
    );
  }
}

export default connect()(withRouter(FuelPurchaseScreen2));

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import H2 from "../../shared/h2/H2";
import Button from "../../shared/button/Button";
import MPosService from "../../../services/MPosService";
import mPosHelper from "../../../helpers/mPosHelper";
import Toast from "../../shared/toast/Toast";
import { setLoading } from "../../../store/actions";
import "./FuelPurchaseScreen2.scss";


class FuelPurchaseScreen2 extends React.Component {

  onSubmit = () => {
    this.props.dispatch(setLoading(true));
    MPosService.getDispenserStatus(this.props.number, {
      notifyDisabled: true,
      onSuccess: (data) => {
        this.props.dispatch(setLoading(false));
        mPosHelper.handleGetStatus(data, {
          setFuel: this.props.setFuel,
          onUp: () => {
            this.props.setScreen(3);
          },
          onDown: () => {
            Toast('Вставте пистолет в бак и повторите операцию');
          }
        });
      }, onError: () => {
        this.props.dispatch(setLoading(false));
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
            <H2 text="Убедитесь, что заправочный пистолет вставлен в горловину бака вашего автомобиля" />
          </div>

          <div className="wrapper-button">
            <Button title="Далее" onClick={this.onSubmit} />
          </div>
        </div>
    );
  }
}


export default connect()(withRouter(FuelPurchaseScreen2));

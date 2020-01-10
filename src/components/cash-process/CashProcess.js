import React from "react";
import { withRouter } from "react-router-dom";
import routes from "../../constants/routes";
import Header from "../shared/header/Header";
import H1 from "../shared/h1/H1";
import PreviousPage from "../shared/previous-page/PreviousPage";
import Button from "../shared/button/Button";
import "./CashProcess.scss";
import CashService from "../../services/CashService";
import Toast from "../shared/toast/Toast";


class CashProcess extends React.Component {

  handleButton = () => {
    if (
        this.props.history &&
        this.props.history.location.state &&
        this.props.history.location.state.route === routes.FUEL_PURCHASE
    ) {
      this.props.history.push(`${routes.FUEL_PURCHASE}`, {
        screen: 5
      });
    } else {
      this.props.history.push(`${routes.PAYMENT_CHECK_CATALOG}`);
    }
  };

  componentDidMount() {
    CashService.start(100, {
      onSuccess: () => {},
      onTimeout: () => {
        Toast('Ошибка связи с купюроприемником')
      },
    })
  }

  render() {
    return (
      <div>
        <Header
          left={<PreviousPage onClick={() => this.props.history.goBack()} />}
          center={<div>Внесение наличных</div>}
          right={null}
        />
        <div className="wrapper-cash-process">
          <H1 text="Внесите наличные средства в купюроприемник" />

          <div className="wrapper-img-cash-process">
            <img
                className="img-cash-process"
                src={require("../../images/cash-process/insert-icon.svg")}
                alt="cash"
            />

            <div className="wrapper-toggle">
              <div className="wrapper-fuel">
                <h4 className="float-l">Внесено</h4>
                <h4 className="float-r">0 грн</h4>
                <div className="clearfix" />
              </div>
              <div className="wrapper-sum">
                <h4 className="float-l">Остаток</h4>
                <h4 className="float-r">270 грн</h4>
                <div className="clearfix" />
              </div>
            </div>
          </div>

          <div className="wrapper-button">
            <Button title="Готово" onClick={this.handleButton} />
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(CashProcess);

import React from "react";
import { connect } from 'react-redux'
import H2 from "../../shared/h2/H2";
import Button from "../../shared/button/Button";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import "./FuelPurchaseScreen1.scss";
import MPosService from "../../../services/MPosService";
import mPosHelper from "../../../helpers/mPosHelper";
import { setLoading } from "../../../store/actions";
import Toast from "../../shared/toast/Toast";


class FuelPurchaseScreen1 extends React.Component {
  constructor(props) {
    super(props);

    const getDispenser = number => {
      return {
        DispenserNumber: number
      }
    };

    this.state = {
      activeValue: this.props.number - 1,
      dispensers: [getDispenser(1), getDispenser(2), getDispenser(3)],
      disabled: true
    };
  }

  componentDidMount() {
    this.props.dispatch(setLoading(true));
    MPosService.getFuelConfig({
      onSuccess: (data) => {
        this.props.dispatch(setLoading(false));
        this.setState({
          dispensers: data['Dispensers'],
          disabled: false,
        })
      }, onError: () => {
        this.props.dispatch(setLoading(false));
      }, onTimeout: () => {
        this.props.dispatch(setLoading(false));
        Toast("Сервер не отвечает")
      }
    })
  }

  onSubmit = () => {
    this.props.dispatch(setLoading(true));
    MPosService.getDispenserStatus(this.props.number, {
      notifyDisabled: true,
      onSuccess: (data) => {
        this.props.dispatch(setLoading(false));
        mPosHelper.handleGetStatus(data, {
          onUp: (fuelData) => {
            this.props.setFuel(fuelData, () => {
              this.props.setScreen(3);
            })
          },
          onDown: () => {
            this.props.setScreen(2);
          }
        });
      }, onError: () => {
        this.props.dispatch(setLoading(false));
        this.props.setScreen(2);
      }, onTimeout: () => {
        this.props.dispatch(setLoading(false));
        Toast("Сервер не отвечает")
      }
    })
  };

  onChange = e => {
    const nextValue = e.target ? e.target.value : e;
    this.setState({
      activeValue: nextValue
    });
    this.props.setNumber(nextValue + 1)
  };

  render() {
    return (
      <div className="wrapper-screen-1">
        <H2 text="Нажимайте на стрелочки чтобы выбрать номер вашей колонки" />
        <div className={`wrapper-slick-slider ${this.state.disabled ? 'disabled': ''}`}>
          <Carousel
            value={this.state.activeValue}
            onChange={this.onChange}
            slidesPerScroll={1}
            slidesPerPage={3}
            infinite={false}
            arrows
            centered={true}
            draggable={false}
            itemWidth={220}
            addArrowClickHandler
            arrowLeft={
              <img
                className="arrow-left"
                name="arrow-left"
                src={require("../../../images/icon/previous-icon@3x.png")}
                alt="arrow left"
              />
            }
            arrowRight={
              <img
                className="arrow-right"
                name="arrow-right"
                src={require("../../../images/icon/previous-icon@3x.png")}
                alt="arrow right"
              />
            }
          >
            {this.state.dispensers.map(i => {
              return (
                <div key={i.DispenserNumber}>
                  <div className="item">
                    <div className="h3">{i.DispenserNumber}</div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="wrapper-button">
          <Button
            title="Далее"
            disabled={this.state.disabled}
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}


export default connect()(FuelPurchaseScreen1)

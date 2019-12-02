import React from "react";
import H2 from "../shared/h2/H2";
import Button from "../shared/button/Button";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import "./FuelPurchaseScreen1.scss";

export default class FuelPurchaseScreen1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColumn: 4,
      activeCarouselValue: 3,
      allColumns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }

  onChange = e => {
    const nextValue = e.target ? e.target.value : e;
    this.setState({
      activeCarouselValue: nextValue,
      selectedColumn: nextValue + 1
    });
  };

  render() {
    return (
      <div className="wrapper-screen-1">
        <H2 text="Нажимайте на стрелочки чтобы выбрать номер вашей колонки" />
        <div className="wrapper-slick-slider">
          <Carousel
            value={this.state.activeCarouselValue}
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
                src={require("../../images/icon/previous-icon@3x.png")}
                alt="arrow left"
              />
            }
            arrowRight={
              <img
                className="arrow-right"
                name="arrow-right"
                src={require("../../images/icon/previous-icon@3x.png")}
                alt="arrow right"
              />
            }
          >
            {this.state.allColumns.map(i => {
              return (
                <>
                  <div className="item">
                    <div className="h3">{i}</div>
                  </div>
                </>
              );
            })}
          </Carousel>
        </div>
        <div className="wrapper-button">
          <Button
            title="Далее"
            onClick={() => this.props.setScreen(this.props.screen + 1)}
          />
        </div>
      </div>
    );
  }
}

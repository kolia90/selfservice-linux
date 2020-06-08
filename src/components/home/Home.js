// @flow
import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import routes from "../../constants/routes";
import "./Home.scss";
import Header from "../shared/header/Header";
import Slider from "../shared/slider/Slider";
import APIService from "../../services/APIService";
import {connect} from "react-redux";
import {setLevelNumber} from "../../store/actions";
import MultiLang from "../../MultiLang";
import Zreport from "../zreport/Zreport";


class Home extends Component {

  state = { items: [] };

  componentDidMount() {
    this.props.dispatch(setLevelNumber(null));
    this.updateSlider(this.props.language)
  }

  updateSlider(language) {
    APIService.getSlides({
      language: language,
      onSuccess: (response) => {
        response.data.results && this.setState({ items: response.data.results });
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.updateSlider(nextProps.language)
    }
  }

  render(){
    return (
      <div>
        <Header />
        <div className="wrapper-home" data-tid="container">
           <Slider>
             {this.state.items.map((child, index) => (
                 <img src={child.image} alt="" key={index} />
             ))}
           </Slider>
        </div>

        <div className="footer-home">
          <Link className="link" to={routes.CHECK_CARD}>
            <MultiLang>
              {{
                uk: "Торкніться щоб активувати",
                ru: "Коснитесь чтобы активировать",
                en: "Touch for activate"
              }}
            </MultiLang>
          </Link>
        </div>

        <Zreport/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  language: state.languageState,
});
export default connect(mapStateToProps)(withRouter(Home));

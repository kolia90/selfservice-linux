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


class Home extends Component {

  state = { items: [] };

  componentDidMount() {
    this.props.dispatch(setLevelNumber(null));

    APIService.getSlides({
      onSuccess: (response) => {
        response.data.results && this.setState({ items: response.data.results });
      }
    })
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
            Коснитесь чтобы активировать
          </Link>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Home));

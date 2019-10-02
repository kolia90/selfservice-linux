import React from "react";
import routes from "../../constants/routes";
import "./Catalog.scss";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import CardItem from "./CardItem";
import Buta from "./Buta";
import PreviousPage from "../shared/previous-page/PreviousPage";
import Cart from "../shared/cart/Cart";

const Catalog = ({ history }) => {
  return (
    <div>
      <Header
        left={
          <PreviousPage onClick={() => history.push(`${routes.SERVICE}`)} />
        }
        center={<div>КАТАЛОГ</div>}
        right={
          <div onClick={() => history.push(`${routes.BASKET}`)}>
            <Cart text={"Корзина"} />
          </div>
        }
      />
      <div className="wrapper-catalog">
        <Buta />
        <div className="catalog">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Catalog);

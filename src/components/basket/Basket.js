import React, { useState } from "react";
import "./Basket.scss";
import { withRouter } from "react-router-dom";
import routes from "../../constants/routes";

import Header from "../shared/header/Header";
import Cart from "../shared/cart/Cart";
import Button from "../shared/button/Button";
import Single from "./Single";

const Basket = ({ history }) => {
  const [quantityFirstProduct, setQuantityFirstProduct] = useState(1);
  const [quantitySecondProduct, setQuantitySecondProduct] = useState(2);
  const [quantityThirdProduct, setQuantityThirdProduct] = useState(1);
  const singleImg1 = require("../../images/catalog/img@3x.jpg");
  const singleImg2 = require("../../images/catalog/Screenshot_1.png");

  return (
    <>
      <Header
        left={null}
        right={
          <div>
            {" "}
            <Cart text={"Корзина"} />{" "}
          </div>
        }
      />
      <div className="wrapper-basket">
        <Single
          img={singleImg1}
          singleName="Донар с курицей"
          description="Цена за штуку: 32 грн"
          supplements="Добавки: сыр, острый соус"
          quantity={quantityFirstProduct}
          increment={() => setQuantityFirstProduct(quantityFirstProduct + 1)}
          decrement={() => setQuantityFirstProduct(quantityFirstProduct - 1)}
        />
        <Single
          img={singleImg2}
          singleName="Вода мін. Моршинська 0,75л н/г"
          description="Цена за штуку: 12,50 грн"
          supplements="0.75 мл"
          quantity={quantitySecondProduct}
          increment={() => setQuantitySecondProduct(quantitySecondProduct + 1)}
          decrement={() => setQuantitySecondProduct(quantitySecondProduct - 1)}
        />
        <Single
          img={singleImg1}
          singleName="Салат с ветчиной и рукколой"
          description="Цена за штуку: 24 грн"
          supplements="Добавки: пармезан, помидор"
          quantity={quantityThirdProduct}
          increment={() => setQuantityThirdProduct(quantityThirdProduct + 1)}
          decrement={() => setQuantityThirdProduct(quantityThirdProduct - 1)}
        />
        <div className="to-cart">
          <Button
            title="Оплатить: 116.50 грн"
            onClick={() => history.push(`${routes.TYPE_PAYMENT}`)}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(Basket);

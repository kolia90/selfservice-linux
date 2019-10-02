// @flow
import React from "react";
import Header from "../shared/header/Header";
import "./Product.scss";
import Button from "../shared/button/Button";
import Ingredient from "./Ingredient";
import routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";
import Cart from "../shared/cart/Cart";

const pitaImg = require("../../images/catalog/img-small@3x.jpg");
const addIngr = require("../../images/icon/add-icon.svg");
const delIngr = require("../../images/icon/remove-icon.svg");

const Product = ({ history }) => {
  return (
    <>
      <Header
        left={
          <PreviousPage onClick={() => history.push(`${routes.CATALOG}`)} />
        }
        center={<div>КАТАЛОГ</div>}
        right={
          <div onClick={() => history.push(`${routes.BASKET}`)}><Cart text={"Корзина"}/></div>
        }
      />
      <div className="product">
        <img
          src={require("../../images/catalog/shava-svinina-3@3x.png")}
          alt=""
        />
        <div className="detail">
          <div className="summary">
            <h2>Описание</h2>
            <div className="description">
              Донар в лаваше с курицей, овощами и зеленью. Классический соус +
              соус на выбор: сырный/острый/майонезный
            </div>
            <div className="float-r">
              <div className="price">25 грн/шт</div>
              <div className="weight">Вес: 630 г</div>
            </div>
            <hr />
          </div>
          <div className="ingredients">
            <h2>Ингридиенты</h2>
            <div className="description">
              Подтвердите или уберите позиции на свое усмотрение
            </div>
            <div className="choose">
              <Ingredient active={true} img={pitaImg} title="Лепешка" />
              <Ingredient img={pitaImg} title="Соус" img2={addIngr}/>
              <Ingredient img={pitaImg} title="Помидор" img2={delIngr}/>
              <Ingredient active={true} img={pitaImg} title="Говядина" />
              <Ingredient img={pitaImg} title="Огурец" img2={addIngr}/>
            </div>
            <hr />
          </div>
          <div className="supplements">
            <h2>Добавки</h2>
            <div className="description">Дополнительные ингридиенты</div>
            <div className="choose">
              <Ingredient img={pitaImg} title="Сыр" img2={addIngr}/>
              <Ingredient img={pitaImg} title="Острый соус" img2={addIngr}/>
              <Ingredient img={pitaImg} title="Маринов. лук" img2={delIngr}/>
            </div>
          </div>
        </div>
        <div className="to-cart">
          <Button title="Добавить в корзину" />
        </div>
      </div>
    </>
  );
};

export default withRouter(Product);

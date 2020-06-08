import React from "react";
import { HashRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import routes from "./constants/routes";
import HomePage from "./containers/HomePage";
import CheckCardPage from "./containers/CheckCardPage";
import ScanPage from "./containers/Scan";
import OfferCardPage from "./containers/OfferCardPage";
import RegisterPhonePage from "./containers/RegisterPhonePage";
import RegisterCodePage from "./containers/RegisterCodePage";
import RegisterFirstNamePage from "./containers/RegisterFirstNamePage";
import RegisterLastNamePage from "./containers/RegisterLastNamePage";
import RegisterEmailPage from "./containers/RegisterEmailPage";
import RegisterCityPage from "./containers/RegisterCityPage";
import RegisterBirthdayPage from "./containers/RegisterBirthdayPage";
import RegisterFinishPage from "./containers/RegisterFinishPage";
import ServicePage from "./containers/ServicePage";
import FuelPurchasePage from "./containers/FuelPurchasePage";
import SelectPaymentPage from "./containers/SelectPaymentPage";
import CatalogPage from "./containers/CatalogPage";
import ProductPage from "./containers/ProductPage";
import TypePaymentPage from "./containers/TypePaymentPage";
import BasketPage from "./containers/BasketPage";
import PaymentCheckCatalogPage from "./containers/PaymentCheckCatalogPage";
import PaymentCashPage from "./containers/PaymentCashPage";
import CashProcessPage from "./containers/CashProcessPage";
import CheckoutPage from "./containers/CheckoutPage";
import SystemMenuPage from "./containers/SystemMenuPage";
import Loader from "./components/shared/loader/Loader";

export default () => (
  <HashRouter>
    <Switch>
      <Route path={routes.HOME} exact={true} component={HomePage} />
      <Route path={routes.CHECK_CARD} component={CheckCardPage} />
      <Route path={routes.SCAN} component={ScanPage} />
      <Route path={routes.OFFER_CARD} component={OfferCardPage} />
      <Route path={routes.REGISTER_PHONE} component={RegisterPhonePage} />
      <Route path={routes.REGISTER_CODE} component={RegisterCodePage} />
      <Route path={routes.REGISTER_FIRST_NAME} component={RegisterFirstNamePage} />
      <Route path={routes.REGISTER_LAST_NAME} component={RegisterLastNamePage} />
      <Route path={routes.REGISTER_BIRTHDAY} component={RegisterBirthdayPage} />
      <Route path={routes.REGISTER_CITY} component={RegisterCityPage} />
      <Route path={routes.REGISTER_EMAIL} component={RegisterEmailPage} />
      <Route path={routes.REGISTER_FINISH} component={RegisterFinishPage} />
      <Route path={routes.SERVICE} component={ServicePage} />
      <Route path={routes.FUEL_PURCHASE} component={FuelPurchasePage} />
      <Route path={routes.SELECT_PAYMENT} component={SelectPaymentPage} />
      <Route path={routes.CATALOG} component={CatalogPage} />
      <Route path={routes.PRODUCT} component={ProductPage} />
      <Route path={routes.TYPE_PAYMENT} component={TypePaymentPage} />
      <Route path={routes.PAYMENT_CASH} component={PaymentCashPage} />
      <Route path={routes.BASKET} component={BasketPage} />
      <Route path={routes.PAYMENT_CHECK_CATALOG} component={PaymentCheckCatalogPage} />
      <Route path={routes.CASH_PROCESS} component={CashProcessPage} />
      <Route path={routes.CHECKOUT} component={CheckoutPage} />
      <Route path={routes.SYSTEM_MENU} component={SystemMenuPage} />
    </Switch>
    <Loader />
  </HashRouter>
);

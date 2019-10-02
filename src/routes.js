import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import routes from "./constants/routes";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import CheckCardPage from "./containers/CheckCardPage";
import ScanPage from "./containers/Scan";
import OfferCardPage from "./containers/OfferCardPage";
import RegisterCardPage from "./containers/RegisterCardPage";
import ServicePage from "./containers/ServicePage";
import FuelPurchasePage from "./containers/FuelPurchasePage";
import SelectPaymentPage from "./containers/SelectPaymentPage";
import CatalogPage from "./containers/CatalogPage";
import ProductPage from "./containers/ProductPage";
import TypePaymentPage from "./containers/TypePaymentPage";
import BasketPage from "./containers/BasketPage";
import PaymentCheckCatalogPage from "./containers/PaymentCheckCatalogPage";
import RegisterCardFinishPage from "./containers/RegisterCardFinishPage";
import PaymentCashPage from "./containers/PaymentCashPage";

export default () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route path={routes.HOME} exact={true} component={HomePage} />
        <Route path={routes.CHECK_CARD} component={CheckCardPage} />
        <Route path={routes.SCAN} component={ScanPage} />
        <Route path={routes.OFFER_CARD} component={OfferCardPage} />
        <Route path={routes.REGISTER_CARD} component={RegisterCardPage} />
        <Route path={routes.REGISTER_CARD_FINISH} component={RegisterCardFinishPage} />
        <Route path={routes.SERVICE} component={ServicePage} />
        <Route path={routes.FUEL_PURCHASE} component={FuelPurchasePage} />
        <Route path={routes.SELECT_PAYMENT} component={SelectPaymentPage} />
        <Route path={routes.CATALOG} component={CatalogPage} />
        <Route path={routes.PRODUCT} component={ProductPage} />
        <Route path={routes.TYPE_PAYMENT} component={TypePaymentPage} />
        <Route path={routes.PAYMENT_CASH} component={PaymentCashPage} />
        <Route path={routes.BASKET} component={BasketPage} />
        <Route path={routes.PAYMENT_CHECK_CATALOG} component={PaymentCheckCatalogPage} />
      </Switch>
    </App>
  </BrowserRouter>
);

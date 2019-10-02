import React, { useState, useEffect } from "react";
import "./FuelPurchase.scss";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";

import PreviousPage from "../shared/previous-page/PreviousPage";
import FuelPurchaseScreen1 from "./FuelPurchaseScreen1";
import FuelPurchaseScreen2 from "./FuelPurchaseScreen2";
import FuelPurchaseScreen3 from "./FuelPurchaseScreen3";
import FuelPurchaseScreen4 from "./FuelPurchaseScreen4";
import FuelPurchaseModal from "./FuelPurchaseModal";
import FuelPurchaseScreen5 from "./FuelPurchaseScreen5";
import FuelPurchaseScreen6 from "./FuelPurchaseScreen6";
import FuelPurchaseScreen7 from "./FuelPurchaseScreen7";

Modal.setAppElement("#root");

const FuelPurchase = ({ history }) => {
  const [title, setTitle] = useState("ПОКУПКА ТОПЛИВА");
  const [screen, setScreen] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const routerState = history.location.state;

  useEffect(() => {
    if (routerState && routerState.screen) {
      setScreen(routerState.screen);
      history.replace({ state: {} });
    }
    return () => {};
  }, [history, history.location, routerState]);

  useEffect(() => {
    if (screen === 3) {
      setTitle("ФОРМА ОПЛАТЫ");
    } else {
      setTitle("ПОКУПКА ТОПЛИВА");
    }

    return () => {};
  }, [screen]);

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setShowModal(false);
        setScreen(7);
        setTitle("ТОПЛИВО ОПЛАЧЕНО");
      }, 3000);
    }
  }, [showModal]);

  const navPrev = () => {
    if (screen === 1 || screen === 5) {
      history.goBack();
    } else {
      setScreen(screen - 1);
    }
  };

  return (
    <>
      <div>
        <Header
          left={<PreviousPage onClick={() => navPrev()} />}
          center={<div>{title}</div>}
          right={null}
        />
        <div className="wrapper-fuel-purchase" data-tid="container">
          {screen === 1 && (
            <div className="wrapper-screen-1">
              <FuelPurchaseScreen1 setScreen={setScreen} screen={screen} />
            </div>
          )}
          {screen === 2 && (
            <div className="wrapper-screen-2">
              <FuelPurchaseScreen2 setScreen={setScreen} screen={screen} />
            </div>
          )}
          {screen === 3 && (
            <div className="wrapper-screen-3">
              <FuelPurchaseScreen3 setScreen={setScreen} screen={screen} />
            </div>
          )}
          {screen === 4 && (
            <div className="wrapper-screen-4">
              <FuelPurchaseScreen4
                setScreen={setScreen}
                screen={screen}
                setShowModal={setShowModal}
              />
            </div>
          )}

          {screen === 5 && (
            <div className="wrapper-screen-5">
              <FuelPurchaseScreen5
                setScreen={setScreen}
                screen={screen}
                setShowModal={setShowModal}
              />
            </div>
          )}

          {screen === 6 && (
            <div className="wrapper-screen-6">
              <FuelPurchaseScreen6
                setScreen={setScreen}
                screen={screen}
                setShowModal={setShowModal}
              />
            </div>
          )}

          {screen === 7 && (
            <div className="wrapper-screen-7">
              <FuelPurchaseScreen7
                setScreen={setScreen}
                screen={screen}
                setShowModal={setShowModal}
              />
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          ariaHideApp={false}
          className="modal"
          overlayClassName="overlay"
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <FuelPurchaseModal />
        </Modal>
      )}
    </>
  );
};

export default withRouter(FuelPurchase);

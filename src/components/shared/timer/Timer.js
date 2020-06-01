// @flow
import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import H1 from '../../shared/h1/H1';
import Modal from "react-modal";
import MultiLang from "../../../MultiLang";
import "./Timer.scss";
import Button from "../button/Button";

Modal.setAppElement("#root");

class Timer extends Component {

  constructor(props){
    super(props);
    this.timer = null;

    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    // document.addEventListener("keyup", this.handleEvent, false);
  }

  componentWillUnmount() {
    // document.removeEventListener("keyup", this.handleEvent, false);
  }

  handleEvent() {
    console.log('Timer clear event')
  }

  handleClick() {
    clearTimeout(this.timer)
  }

  render() {
    return (
        <Modal
            ariaHideApp={false}
            className="timer-modal"
            overlayClassName="overlay"
            isOpen={this.state.isOpen}
            onRequestClose={() => {}}
        >
          <div className="modal-content">
            <H1 text={<MultiLang>
              {{
                uk: "Ви ще тут?",
                ru: "Вы еще здесь?",
                en: "Are you there?"
              }}
            </MultiLang>} />

            <Button title={
              <MultiLang>
                {{
                  uk: "Так",
                  ru: "Да",
                  en: "Yes"
                }}
              </MultiLang>
            } onClick={this.handleClick}/>
          </div>
        </Modal>
    )
  }
}

export default connect()(withRouter(Timer))

import React from "react";
import styles from "./CheckoutCard.module.scss";
import CardLevel from "../card/CardLevel";
import CardVisa from "../card/CardVisa";
import CardMastercard from "../card/CardMastercard";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import APIService from "../../../services/APIService";
import CardTerminal from "../card/CardTerminal";
import constants from "../constants";
import MultiLang from "../../../MultiLang";


class CheckoutCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      level: null,
      cards: [],
    }
  }

  initCards = () => {
    APIService.getLevel(this.props.user.token, {
      loading: false,
      context: this.props,
      onSuccess: (response) => {
        this.setState({
          level: {
            number: response.data.number,
            balance: response.data.balance,
          }
        })
      },
      onErrorMessage: (
        <MultiLang>
          {{
            uk: "Помилка отримання бонусної карти",
            ru: "Ошибка получения бонусной карты",
            en: "Error getting bonus card"
          }}
        </MultiLang>
      )
    });

    APIService.getCards(this.props.user.token, {
      onSuccess: (response) => {
        this.setState({
          cards: response.data.results || []
        })
      },
      onErrorMessage: (
          <MultiLang>
            {{
              uk: "Помилка отримання платіжних карт",
              ru: "Ошибка получения списка платежных карт",
              en: "Error getting payment cards"
            }}
          </MultiLang>
      )
    })
  };

  componentDidMount() {
    this.props.user && this.initCards();
  }

  onSelectTerminal = () => {
    this.props.onSelectCard(constants.cards.TERMINAL)
  };

  onSelectLevel = () => {
    this.props.onSelectCard(constants.cards.LEVEL, this.state.level.number, this.state.level.balance)
  };

  onSelectCard = (card) => {
    let type = (card.card_type === 'visa') ? constants.cards.VISA : constants.cards.MASTERCARD;
    this.props.onSelectCard(type, this.toNumber(card.card_pan), null, card.id)
  };

  toNumber = (card_pan) => {
    const lastNumbers = card_pan.slice(-4);
    return `**** **** **** ${lastNumbers}`
  };

  render(){
    return (
      <div className="container">
        <CardTerminal styles={styles} onSelect={this.onSelectTerminal} />
        {this.state.level && (
          <CardLevel styles={styles} onSelect={this.onSelectLevel} balance={this.state.level.balance} />
        )}
        {this.state.cards.map(i => {
          return (
            <div key={i.id}>
              {(i.card_type === 'visa') ? (
                <CardVisa styles={styles} onSelect={() => this.onSelectCard(i)} number={this.toNumber(i.card_pan)} />
              ) : (
                <CardMastercard styles={styles} onSelect={() => this.onSelectCard(i)} number={this.toNumber(i.card_pan)} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState,
  language: state.languageState,
});

export default connect(
    mapStateToProps,
)(withRouter(CheckoutCard))

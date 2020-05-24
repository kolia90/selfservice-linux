import React from "react";
import styles from "./SelectPaymentStep1.module.scss";
import PaymentLevel from "./PaymentLevel";
import PaymentVisa from "./PaymentVisa";
import PaymentMastercard from "./PaymentMastercard";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import APIService from "../../services/APIService";


class SelectPaymentStep1 extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      level: null,
      cards: [],
    }
  }

  componentDidMount() {
    APIService.getLevel(this.props.user.token, {
      onSuccess: (response) => {
        this.setState({
          level: {
            number: response.data.number,
            balance: response.data.balance,
          }
        })
      }
    });

    APIService.getCards(this.props.user.token, {
      onSuccess: (response) => {
        this.setState({
          cards: response.data.results || []
        })
      }
    })
  }

  onSelectLevel = (type) => {
    this.props.onSelectPayment(type, this.state.level.number, this.state.level.balance)
  };

  onSelectCard = (type, number, id) => {
    this.props.onSelectPayment(type, number, null, id)
  };

  toNumber = (card_pan) => {
    const lastNumbers = card_pan.slice(-4);
    return `**** **** **** ${lastNumbers}`
  };

  render(){
    return (
      <div className="container">
        {this.state.level && (
          <PaymentLevel styles={styles} onSelect={this.onSelectLevel} balance={this.state.level.balance} />
        )}
        {this.state.cards.map(i => {
          return (
            <div key={i.id}>
              {(i.card_type === 'visa') ? (
                <PaymentVisa styles={styles} onSelect={(type, number) => this.onSelectCard(type, number, i)} number={this.toNumber(i.card_pan)} />
              ) : (
                <PaymentMastercard styles={styles} onSelect={(type, number) => this.onSelectCard(type, number, i)} number={this.toNumber(i.card_pan)} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({user: state.userState});

export default connect(
    mapStateToProps,
)(withRouter(SelectPaymentStep1))

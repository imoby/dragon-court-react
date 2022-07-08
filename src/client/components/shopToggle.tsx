import React from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../css/radioButtons.css";

type Props = {
  transactionTypeChange: (event: any) => void;
  transactionType: string;
  performTrade: () => void;
};

type State = {
  transactionType: string;
};

export default class ShopToggle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      transactionType: this.props.transactionType,
    };
  }

  render(): React.ReactNode {
    return (
      <>
        <Col className="col-2">
          <Button variant={"outline-light"} onClick={this.props.performTrade}>
            Trade
          </Button>
        </Col>
        <Col className="col-4">
          <Form.Check
            inline
            label="Buy"
            name="transactionType"
            type="radio"
            checked={this.state.transactionType === "buy"}
            onChange={this.props.transactionTypeChange}
          />
          <Form.Check
            inline
            label="Sell"
            name="transactionType"
            type="radio"
            checked={this.state.transactionType === "sell"}
            onChange={this.props.transactionTypeChange}
          />
        </Col>
        <Col>&nbsp;</Col>
      </>
    );
  }
}

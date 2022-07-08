import React from "react";

import Col from "react-bootstrap/Col";

type Props = {
  exitBuilding: () => void;
};

type State = {
  transactionType: string;
};

export default class ShopExit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <Col className="col-2">
        <img
          className="img-fluid"
          src={`/images/game/exit.png`}
          onClick={this.props.exitBuilding}
        />
      </Col>
    );
  }
}

import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../css/building.css";

type Props = {
  item: any;
  onClick: (item: DC.Item) => void;
};

type State = {
  item: any;
};

export default class ListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      item: this.props.item,
    };
  }

  render(): React.ReactNode {
    return (
      <tr onClick={() => this.props.onClick(this.state.item)}>
        <td>{this.state.item.name}</td>
        <td>
          {this.state.item.attack && (
            <Col className="col-2">+{this.state.item.attack}a</Col>
          )}
        </td>
        <td>
          {this.state.item.defend && (
            <Col className="col-2">+{this.state.item.defend}d</Col>
          )}
        </td>
        <td>{`${this.state.item.cost}`}</td>
      </tr>
    );
  }
}

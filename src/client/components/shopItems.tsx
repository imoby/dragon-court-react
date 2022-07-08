import React from "react";

import Table from "react-bootstrap/Table";
import ListItem from "./shopItemRows";

import "../css/building.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  items: DC.Item[];
  itemClick: (item: DC.Item) => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  items: DC.Item[];
};

export default class ShopItems extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
      items: this.props.items,
    };
  }

  render(): React.ReactNode {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th colSpan={2}>Stats</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((item: any) => (
            <ListItem
              key={item.id}
              item={item}
              onClick={this.props.itemClick}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

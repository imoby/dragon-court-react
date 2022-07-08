import React from "react";

import Col from "react-bootstrap/Col";

type Props = {
  item: DC.InventoryItem;
  onClick: (item: DC.InventoryItem) => void;
};

type State = {
  item: DC.InventoryItem;
};

export default class ListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      item: this.props.item,
    };
  }

  showAttack(identified: number) {
    if (identified) {
      if (this.state.item.attack == 0) {
        return "";
      } else {
        if (this.state.item.attack) {
          return `+${this.state.item.attack}a`;
        } else {
          return `${this.state.item.attack}a`;
        }
      }
    }
    return "";
  }

  showDefend(identified: number) {
    if (identified) {
      if (this.state.item.defend == 0) {
        return "";
      } else {
        if (this.state.item.defend) {
          return `+${this.state.item.defend}d`;
        } else {
          return `${this.state.item.defend}d`;
        }
      }
    }
    return "";
  }

  render(): React.ReactNode {
    return (
      <tr onClick={() => this.props.onClick(this.state.item)}>
        <td>{this.state.item.name}</td>
        <td>{this.showAttack(this.state.item.identified)}</td>
        <td>{this.showDefend(this.state.item.identified)}</td>
      </tr>
    );
  }
}

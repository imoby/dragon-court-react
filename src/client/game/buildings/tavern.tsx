import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import ShopNPC from "../../components/shopNPC";
import ShopExit from "../../components/shopExit";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitBuilding: () => void;
  items: DC.Item[];
  blurb: string;
  rest: (location: string) => void;
  rumor: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  items: DC.Item[];
};

class Tavern extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
      items: this.props.items,
    };
  }

  itemClick(item: any) {
    console.log(item);
  }

  render(): React.ReactNode {
    return (
      <>
        <Row>
          <ShopExit exitBuilding={this.props.exitBuilding} />
          <Col>&nbsp;</Col>
        </Row>

        <Row>
          <Col className="col-4">
            <ShopNPC blurb={this.props.blurb} type={"weapons"} />
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
          </Col>
          <Col className="col-8">
            <Row>
              <Col>
                <Button
                  variant={"outline-light"}
                  onClick={() => this.props.rest("floor")}
                >
                  Sleep on the Floor
                </Button>
              </Col>
              <Col>
                <Button
                  variant={"outline-light"}
                  onClick={() => this.props.rest("room")}
                >
                  Rent a Room
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant={"outline-light"}
                  onClick={() => this.props.rest("suite")}
                >
                  Rent a Suite
                </Button>
              </Col>
              <Col>
                <Button
                  variant={"outline-light"}
                  onClick={() => this.props.rumor()}
                >
                  Buy a Drink
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default Tavern;

import React from "react";
import { Socket } from "socket.io-client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "../css/statbar.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitGame: () => void;
  characterPage: () => void;
};

type State = {
  nameAndRank: string;
  experience: number;
  cash: number;
  guts: number | string;
  wits: number | string;
  charm: number | string;
  quests: number | string;
  level: number;
};

class StatBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      nameAndRank: this.props.Player.rankString + " " + this.props.User.name,
      experience: this.props.Player.experience,
      cash: this.props.Player.cash,
      guts: this.props.Player.stats.guts,
      wits: this.props.Player.stats.wits,
      charm: this.props.Player.stats.charm,
      quests: this.props.Player.quests,
      level: this.props.Player.level,
    };
  }

  render(): React.ReactNode {
    return (
      <div>
        {/* display for small screens */}
        <div className="d-block d-sm-none statbar">
          <Row>
            <Col className="col-10">
              <Row>
                <Col className="col-6">{this.state.nameAndRank}</Col>
                <Col className="col-3">XP: {this.state.experience}</Col>
                <Col className="col-3">
                  Cash: {"$"}
                  {this.state.cash}
                </Col>
              </Row>
              <Row>
                <Col className="col-3">Guts: {this.state.guts}</Col>
                <Col className="col-3">Wits: {this.state.wits}</Col>
                <Col className="col-3">Charm: {this.state.charm}</Col>
              </Row>
              <Row>
                <Col className="col-3">Qsts: {this.state.quests}</Col>
                <Col className="col-3">Lvl: {this.state.level}</Col>
                <Col className="col-6">{"Weapon & Armor"}</Col>
              </Row>
            </Col>
            <Col className="col-1">
              <Button variant="secondary" className="statBarButton">
                Inv
              </Button>
            </Col>
          </Row>
        </div>

        {/* display for large screens */}
        <div className="d-none d-sm-block statbar">
          <Row>
            <Col>
              <Row>
                <Col className="col-4">{this.state.nameAndRank}</Col>
                <Col className="col-2">Exp: {this.state.experience}</Col>
                <Col className="col-2">
                  Cash: {"$"}
                  {this.state.cash}
                </Col>
                <Col className="col-2">Quests: {this.state.quests}</Col>
                <Col className="col-2">Level: {this.state.level}</Col>
              </Row>
              <Row>
                <Col className="col-3">Guts: {this.state.guts}</Col>
                <Col className="col-3">Wits: {this.state.wits}</Col>
                <Col className="col-3">Charm: {this.state.charm}</Col>
                <Col className="col-3">{"Weapon & Armor"}</Col>
              </Row>
            </Col>
            <Col className="col-1 me-3">
              <Button
                className="character-button"
                variant="dark"
                onClick={this.props.characterPage}
              >
                <img src={"/images/dragon-head-small.png"} />
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StatBar;

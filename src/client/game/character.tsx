import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import PlayerItems from "../components/playerItems";

import "../css/character.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitScreen: () => void;
  itemClick: (item: DC.InventoryItem) => void;
  selectedItem: DC.InventoryItem | DC.Item | null;
  inventoryItemUse: () => void;
  inventoryItemInfo: () => void;
  inventoryPeer: () => void;
  inventoryRecover: () => void;
  inventoryDump: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

export default class Character extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
    };
  }

  render(): React.ReactNode {
    const equipment: DC.equipment = {};
    if (this.state.Player.equipmentStrings.head !== "") {
      equipment.head = JSON.parse(this.state.Player.equipmentStrings.head);
    }
    if (this.state.Player.equipmentStrings.body !== "") {
      equipment.body = JSON.parse(this.state.Player.equipmentStrings.body);
    }
    if (this.state.Player.equipmentStrings.feet !== "") {
      equipment.feet = JSON.parse(this.state.Player.equipmentStrings.feet);
    }
    if (this.state.Player.equipmentStrings.left !== "") {
      equipment.left = JSON.parse(this.state.Player.equipmentStrings.left);
    }
    if (this.state.Player.equipmentStrings.right !== "") {
      equipment.right = JSON.parse(this.state.Player.equipmentStrings.right);
    }

    const nextLvlExp = Math.round(
      50 * Math.pow(1.3999999761581421, this.props.Player.level - 1)
    );
    const expProgress = Math.round(
      (this.props.Player.experience / nextLvlExp) * 100
    );

    return (
      <div
        style={{
          backgroundColor: "#AD3D09",
          fontSize: "0.8em",
          height: "100%",
        }}
      >
        <Row>
          <Col className="col-8">
            <Row>
              <Col>
                {this.props.Player.rankString + " " + this.props.User.name}
              </Col>
            </Row>
            <Row>
              <Col>Level: {this.props.Player.level}</Col>
              <Col>Rank: {this.props.Player.rankString}</Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col>Guts: {this.props.Player.stats.guts}</Col>
              <Col>Attack: {this.props.Player.stats.attack}</Col>
            </Row>
            <Row>
              <Col>Wits: {this.props.Player.stats.wits}</Col>
              <Col>Defend: {this.props.Player.stats.defend}</Col>
            </Row>
            <Row>
              <Col>Charm: {this.props.Player.stats.charm}</Col>
              <Col>Skill: {this.props.Player.stats.skill}</Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col>
                Quests: {this.props.Player.quests}/{this.props.Player.questsMax}
              </Col>
              <Col>
                <div className="float-start">Exp:</div>
                <div className="float-end">
                  <ProgressBar now={expProgress} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </Col>
          <Col className="col-4">
            <img src={`/images/game/player.png`} />
          </Col>
        </Row>
        <Row>
          <Col className="text-center"></Col>
        </Row>
        <Row>
          <Col className="col-5">
            <Row>
              <Col className="item-table-container">
                <PlayerItems
                  User={this.state.User}
                  Player={this.state.Player}
                  items={this.state.Player.inventory}
                  itemClick={this.props.itemClick}
                />
              </Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col>
                Backpack: {this.state.Player.storage}/
                {this.state.Player.storageMax}
              </Col>
            </Row>
          </Col>
          <Col className="col-7">
            <Row>
              <Col>
                <Row>
                  <Col>
                    H:
                    {equipment.head !== undefined && `${equipment.head}`}
                    {equipment.head == undefined && `None`}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    B: {equipment.body !== undefined && `${equipment.body}`}
                    {equipment.body == undefined && `None`}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    F: {equipment.feet !== undefined && `${equipment.feet}`}
                    {equipment.feet == undefined && `None`}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    R: {equipment.right !== undefined && `${equipment.right}`}
                    {equipment.right == undefined && `None`}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    L: {equipment.left !== undefined && `${equipment.left}`}
                    {equipment.left == undefined && `None`}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => this.props.inventoryItemUse()}
                    >
                      Use
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => this.props.inventoryItemInfo()}
                    >
                      Info
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => this.props.inventoryPeer()}
                    >
                      Peer
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => this.props.inventoryDump()}
                    >
                      Dump Slot
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => this.props.inventoryRecover()}
                    >
                      Oops
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={this.props.exitScreen}
                    >
                      Exit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

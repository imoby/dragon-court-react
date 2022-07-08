import React from "react";
import { Socket } from "socket.io-client";

import Template from "../gameTemplate";
const template = new Template();

import WelcomeScreen from "../components/welcomeScreen";

import Region from "./region";
import StatBar from "./stat-bar";
import Building from "./building";
import Character from "./character";

type Props = {
  User: DC.User;
  Player: DC.Player;
  Items: DC.Item[];
  socket: Socket;
  request: (target: string, input: any) => Promise<any>;
  exitGame: () => void;
  enterGame: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  inBuilding: boolean;
  building: string;
  inCharacterPage: boolean;
  inEncounter: boolean;
  firstPlay: boolean;
  transactionType: string;
  selectedItem: DC.InventoryItem | DC.Item | null;
};

class GameScreen extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.regionChange = this.regionChange.bind(this);
    this.enterBuilding = this.enterBuilding.bind(this);
    this.exitBuilding = this.exitBuilding.bind(this);
    this.performQuest = this.performQuest.bind(this);
    this.characterPage = this.characterPage.bind(this);
    this.goAdventuring = this.goAdventuring.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.polish = this.polish.bind(this);
    this.identify = this.identify.bind(this);
    this.info = this.info.bind(this);
    this.rest = this.rest.bind(this);
    this.rumor = this.rumor.bind(this);
    this.heal = this.heal.bind(this);
    this.transactionTypeChange = this.transactionTypeChange.bind(this);
    this.performTrade = this.performTrade.bind(this);
    this.update = this.update.bind(this);

    this.state = {
      inBuilding: false,
      building: "",
      inCharacterPage: false,
      inEncounter: false,
      User: this.props.User,
      Player: this.props.Player,
      firstPlay: true,
      transactionType: "buy",
      selectedItem: null,
    };
  }

  update() {
    this.props.socket.emit("player-update", this.state.Player);
  }

  characterPage() {
    this.setState({
      inCharacterPage: true,
    });
  }

  regionChange(region: string) {
    const player = this.state.Player;

    player.region = region;
    this.setState({
      Player: player,
    });
  }

  enterBuilding(type: string) {
    this.setState({
      inBuilding: true,
      building: type,
    });
  }

  exitBuilding() {
    this.setState({
      inBuilding: false,
      building: "",
    });
  }

  transactionTypeChange(event: any) {
    event.preventDefault();
    this.setState({
      transactionType: event.target.value,
    });
  }

  itemClick(item: DC.Item | DC.InventoryItem) {
    this.setState({
      selectedItem: item,
    });
  }

  findItem(inventory: any, id: number) {
    return inventory.find((obj: any) => {
      return obj.id === id || obj.itemId === id;
    });
  }

  removeItem(inventory: DC.InventoryItem[], id: number) {
    return inventory.splice(
      inventory.findIndex((item: DC.InventoryItem) => item.itemId === id),
      1
    );
  }

  performTrade() {
    if (this.state.selectedItem === null) {
      template.modal("shop-error", "Ooops!", "You have not selected an item.");
      return false;
    }

    if (this.state.transactionType === "buy") {
      const cost = this.state.selectedItem.cost;
      if (cost > this.state.Player.cash) {
        template.modal(
          "shop-error",
          "Ooops!",
          "You do not have enough money for this transaction."
        );

        this.setState({
          selectedItem: null,
        });

        return false;
      } else {
        const p = this.state.Player;
        p.cash = p.cash - cost;
        p.cashToday = p.cashToday - cost;

        const itm = this.findItem(p.inventory, this.state.selectedItem.id);
        if (itm) {
          itm.qty = itm.qty + 1;
          p.inventory = this.removeItem(p.inventory, itm.id);
          p.inventory.push(itm);
        } else {
          p.inventory.push(itm);
        }

        this.setState({
          Player: p,
          selectedItem: null,
        });
      }
    }

    if (this.state.transactionType === "sell") {
      const p = this.state.Player;
      p.cash =
        p.cash +
        (this.state.selectedItem.cost - this.state.selectedItem.cost / 0.02);
      p.cashToday =
        p.cashToday +
        (this.state.selectedItem.cost - this.state.selectedItem.cost / 0.02);

      p.inventory = this.removeItem(p.inventory, this.state.selectedItem.id);

      this.setState({
        Player: p,
        selectedItem: null,
      });
    }

    this.update();
  }

  polish() {}

  identify() {
    const itm = this.state.selectedItem as DC.InventoryItem;
    if (itm.identified) {
      return;
    } else {
      const p = this.state.Player;
      p.cash = p.cash - 40;
      p.cashToday = p.cashToday - 40;

      const item = this.findItem(p.inventory, itm.id);
      item.identified = 1;
      item.identifiedName =
        item.name +
        (item.attack
          ? " +" + item.attack + "a"
          : item.attack > 0
          ? " -" + item.attack + "a"
          : "") +
        (item.defend
          ? " +" + item.defend + "d"
          : item.defend > 0
          ? " -" + item.defend + "d"
          : "");

      p.inventory = this.removeItem(p.inventory, itm.id);
      p.inventory.push(item);
    }
  }

  info() {}

  rest(location: string) {}

  rumor() {}

  heal() {}

  tithe() {}

  performQuest(region: string, type: string) {}

  exitCharacter() {
    this.setState({
      inCharacterPage: false,
    });
  }

  inventoryItemUse() {
    if (this.state.selectedItem === null) {
      template.modal(
        "inventory-error",
        "Ooops!",
        "You have not selected an item."
      );
      return false;
    }
  }

  inventoryItemInfo() {
    if (this.state.selectedItem === null) {
      template.modal(
        "inventory-error",
        "Ooops!",
        "You have not selected an item."
      );
      return false;
    }
  }

  inventoryDump() {
    if (this.state.selectedItem === null) {
      template.modal(
        "inventory-error",
        "Ooops!",
        "You have not selected an item."
      );
      return false;
    }
  }

  inventoryRecover() {}

  inventoryPeer() {}

  goAdventuring() {
    const user = this.state.User;
    user.firstRun = 0;

    this.setState({
      User: user,
      firstPlay: false,
    });

    this.props.socket.emit("user-update", this.state.User);

    this.props.enterGame();
  }

  renderStatBar() {
    return (
      <StatBar
        Player={this.props.Player}
        User={this.props.User}
        exitGame={this.props.exitGame}
        characterPage={this.characterPage}
      />
    );
  }

  renderGameScreen() {}

  render(): React.ReactNode {
    const screenSize = {
      height: "22em",
      width: "70%",
      marginTop: "1.2em",
      marginRight: "1.2em",
      border: "1px solid black",
    };
    if (this.state.User.firstRun) {
      return (
        <WelcomeScreen
          screenSize={screenSize}
          text={template.getText("awaken.first")}
          goAdventuring={this.goAdventuring}
        />
      );
    } else if (this.state.firstPlay) {
      return (
        <WelcomeScreen
          screenSize={screenSize}
          text={template.awakenText(this.state.User, this.state.Player)}
          goAdventuring={this.goAdventuring}
        />
      );
    } else {
      return (
        <div style={screenSize}>
          <div style={{ height: "100%" }}>
            {this.state.inBuilding && (
              <Building
                type={this.state.building}
                Items={this.props.Items}
                User={this.state.User}
                Player={this.state.Player}
                exitBuilding={this.exitBuilding}
                performQuest={this.performQuest}
                itemClick={this.itemClick}
                selectedItem={this.state.selectedItem}
                performTrade={this.performTrade}
                polish={this.polish}
                identify={this.identify}
                info={this.identify}
                rest={this.rest}
                rumor={this.rumor}
                transactionType={this.state.transactionType}
                transactionTypeChange={this.transactionTypeChange}
                heal={this.heal}
                tithe={this.tithe}
              />
            )}

            {this.state.inCharacterPage && (
              <Character
                Player={this.props.Player}
                User={this.props.User}
                itemClick={this.itemClick}
                selectedItem={this.state.selectedItem}
                exitScreen={this.exitCharacter}
                inventoryItemUse={this.inventoryItemUse}
                inventoryItemInfo={this.inventoryItemInfo}
                inventoryDump={this.inventoryDump}
                inventoryRecover={this.inventoryRecover}
                inventoryPeer={this.inventoryPeer}
              />
            )}

            {this.state.inEncounter && <div>Encounter</div>}

            {!this.state.inBuilding &&
              !this.state.inEncounter &&
              !this.state.inCharacterPage && (
                <Region
                  Player={this.props.Player}
                  User={this.props.User}
                  socket={this.props.socket}
                  exitGame={this.props.exitGame}
                  regionChange={this.regionChange}
                  enterBuilding={this.enterBuilding}
                  performQuest={this.performQuest}
                />
              )}
          </div>
          <div>{this.renderStatBar()}</div>
        </div>
      );
    }
  }
}

export default GameScreen;

import React from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import "../css/chat.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  inGame: boolean;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Chat extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
    };
  }

  render(): React.ReactNode {
    if (this.props.inGame) {
      return (
        <div className="chatDiv">
          <ButtonGroup aria-label="Chat Room">
            <Button variant="secondary">Global</Button>
            <Button variant="secondary">Alliance</Button>
            <Button variant="secondary">Region</Button>
          </ButtonGroup>
          <div className="chatMsgInput">
            <input type="text" name="chatInput" />
            <input
              type="button"
              className="chatSubmit"
              name="chatSubmit"
              value="Chat"
            />
          </div>
          <ul className="chatHistory"></ul>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Chat;

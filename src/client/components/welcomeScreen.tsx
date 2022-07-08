import React from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../css/welcomeScreen.css";

type Props = {
  screenSize: {
    height: string;
    width: string;
    marginTop: string;
  };
  goAdventuring: () => void;
  text: string;
};

export default class WelcomeScreen extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div style={this.props.screenSize} className="welcomeScreen">
        <Row>
          <Col className="text-center">
            <p>{this.props.text}</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button variant={"secondary"} onClick={this.props.goAdventuring}>
              Go Adventuring
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

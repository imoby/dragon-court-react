import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

type Props = {
  blurb: string;
  type: string;
};

export default class ShopNPC extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <>
        <Row>
          <Col>
            <Image
              fluid={true}
              src={`/images/game/npc/${this.props.type}.png`}
            />
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>{this.props.blurb}</Col>
        </Row>
      </>
    );
  }
}

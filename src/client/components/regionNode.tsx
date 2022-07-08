import React from "react";
import Col from "react-bootstrap/Col";

type Props = {
  img: string;
  title: string;
  onClick: () => void;
};

export default class RegionNode extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <Col className={`col-4 text-center`} onClick={this.props.onClick}>
        <img className="img-fluid" src={`/images/game/${this.props.img}.png`} />
        <br />
        {this.props.title}
      </Col>
    );
  }
}

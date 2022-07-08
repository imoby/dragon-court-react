import React from "react";
import Col from "react-bootstrap/Col";

type Props = {
  title: string;
};

export default class RegionTitle extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <Col className="col-8">
        <span style={{ fontSize: "1.3em" }}>{this.props.title}</span>
      </Col>
    );
  }
}

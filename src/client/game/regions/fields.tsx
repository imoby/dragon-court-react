import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Fields extends React.Component<DC.Props, any> {
	constructor(props: DC.Props) {
		super(props);

		this.setState({
			Player: props.Player,
			User: props.User,
		});
	}

	makeMounds(): React.ReactNode {
		return (
			<Col className="col-6 mt-5 text-center">
				<div className="region-change" data-id="mounds">
					<img
						className="img-fluid"
						src="/images/game/regions/fields_to_mounds.png"
					/>
					<br />
					Goblin Mounds
				</div>
			</Col>
		);
	}

	makeForest(): React.ReactNode {
		return (
			<Col className="col-6 mt-5 text-center">
				<div className="region-change" data-id="forest">
					<img
						className="img-fluid"
						src="/images/game/regions/fields_to_forest.png"
					/>
					<br />
					To Forest
				</div>
			</Col>
		);
	}

	render(): React.ReactNode {
		return (
			<div style={{ backgroundColor: "#fa898c" }} className="h-100 region">
				<Row>
					<Col className="col-6">
						<span style={{ fontSize: "1.3em" }}>
							The Fields Near Salamander Township
						</span>
					</Col>
					<Col className="col-6 mt-4 text-center">
						<div className="region-change" data-id="town">
							<img
								className="img-fluid"
								src="/images/game/regions/fields_to_town.jpg"
							/>
							<br />
							To Town
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 mt-2 offset-2 text-center">
						<div className="shop" data-id="healer">
							<img className="img-fluid" src="/images/game/shops/healer.png" />
							<br />
							Healer's Tower
						</div>
					</Col>
					<Col className="col-6 text-center">
						<div className="quest" data-id="fields">
							<img className="img-fluid" src="/images/game/fields_quest.png" />
							<br />
							Quest
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Fields;

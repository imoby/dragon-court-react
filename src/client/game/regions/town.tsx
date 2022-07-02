import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Town extends React.Component<DC.Props, any> {
	constructor(props: DC.Props) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<div style={{ backgroundColor: "#00c79f" }} className="h-100 region">
				<Row>
					<Col className="col-6">
						<span style={{ fontSize: "1.3em" }}>
							Main Street in Salamander Township
						</span>
					</Col>
					<Col className="col-6 mt-4 text-center">
						<div className="region-change" data-id="castle">
							<img
								className="img-fluid"
								src="/images/game/regions/town_to_castle.png"
							/>
							<br />
							Castle Gate
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 mt-2 offset-2 text-center">
						<div className="shop" data-id="weapons">
							<img className="img-fluid" src="/images/game/shops/weapons.png" />
							<br />
							Smith's Weapons
						</div>
					</Col>
					<Col className="col-6 text-center">
						<div className="shop" data-id="tavern">
							<img className="img-fluid" src="/images/game/shops/tavern.png" />
							<br />
							Keeper's Tavern
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 mt-5 text-center">
						<div className="region-change" data-id="fields">
							<img
								className="img-fluid"
								src="/images/game/regions/town_to_fields.png"
							/>
							<br />
							Leave Town
						</div>
					</Col>
					<Col className="col-6 mt-5 text-center">
						<div className="shop" data-id="trade">
							<img className="img-fluid" src="/images/game/shops/trade.png" />
							<br />
							Trade Shoppe
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Town;

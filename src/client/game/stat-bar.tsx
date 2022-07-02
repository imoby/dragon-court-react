import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

type Props = {
	User: DC.User;
	Player: DC.Player;
}

class StatBar extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			nameAndRank: this.props.Player.nameAndRank,
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
			<Container>
				<div className="d-block d-sm-none">
					<Row className="h-100">
						<Col className="col-10">
							<Row>
								<Col className="col-6">
									<span className="statsNameAndRank">
										{this.state.nameAndRank}
									</span>
								</Col>
								<Col className="col-3">
									XP:{" "}
									<span className="statsExperience">
										{this.state.experience}
									</span>
								</Col>
								<Col className="col-3">
									$<span className="statsCash">{this.state.cash}</span>
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									Guts: <span className="statsGuts">{this.state.guts}</span>
								</Col>
								<Col className="col-3">
									Wits: <span className="statsWits">{this.state.wits}</span>
								</Col>
								<Col className="col-3">
									Charm: <span className="statsCharm">{this.state.charm}</span>
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									Qsts: <span className="statsQuests">{this.state.quests}</span>
								</Col>
								<Col className="col-3">
									Lvl: <span className="statsLevel">{this.state.level}</span>
								</Col>
								<Col className="col-6">
									<span className="statsWeaponAndArmor">
										Weapon &amp; Armor
									</span>
								</Col>
							</Row>
						</Col>
						<Col className="col-1">
							<Button variant="secondary" className="statBarButton">
								Inv
							</Button>
						</Col>
					</Row>
				</div>

				<div className="d-none d-sm-block">
					<Row className="h-100">
						<Col className="col-11">
							<Row>
								<Col className="col-auto">
									<span className="statsNameAndRank">
										{this.state.nameAndRank}
									</span>
								</Col>
								<Col className="col-2">
									Exp:{" "}
									<span className="statsExperience">
										{this.state.experience}
									</span>
								</Col>
								<Col className="col-1">
									$<span className="statsCash">{this.state.cash}</span>
								</Col>
								<Col className="col-2">
									Quests:{" "}
									<span className="statsQuests">{this.state.quests}</span>
								</Col>
								<Col className="col-2">
									Level: <span className="statsLevel">{this.state.level}</span>
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									Guts: <span className="statsGuts">{this.state.guts}</span>
								</Col>
								<Col className="col-3">
									Wits: <span className="statsWits">{this.state.wits}</span>
								</Col>
								<Col className="col-3">
									Charm: <span className="statsCharm">{this.state.charm}</span>
								</Col>
								<Col className="col-auto">
									<span className="statsWeaponAndArmor">
										Weapon &amp; Armor
									</span>
								</Col>
							</Row>
							<Row></Row>
						</Col>
						<Col className="col-1">
							<Button variant="secondary" className="statBarButton">
								Inv
							</Button>
						</Col>
					</Row>
				</div>
			</Container>
		);
	}
}

export default StatBar;

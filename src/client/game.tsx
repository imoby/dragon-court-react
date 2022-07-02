import React from "react";
import io from 'socket.io-client';
let socket = io(`http://23.234.250.103:33039`);

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Display from "./game/display";

import "./css/game.css";

class Game extends React.Component<any, any> {
	constructor(props: any){
		super(props);

		this.state = {
			data: {}
		}
	}

	render() {
		return (
			<Container fluid className="mt-auto h-100">
				<Row>
					<Col>
						<div className="d-block d-md-none">
							<Display size="small" socket={socket} />
						</div>

						<div className="d-none d-md-block">
							<Display size="large" socket={socket} />
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Game;

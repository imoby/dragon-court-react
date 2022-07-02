import React from "react";
import {Socket} from 'socket.io-client';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Creation from "./creation";
import GameScreen from "./game-screen";
import Chat from "./chat";

type Props = {
	size: string;
	socket: Socket;
};

type State = {
	backstory: string;
	User: DC.User;
	Player?: DC.Player;
	inCreation: boolean;
}

class Display extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = { backstory: "", User: window.User, inCreation: false };
		this.handleCreationSubmit = this.handleCreationSubmit.bind(this);

		if(this.state.User.hasChar){
			if(this.state.Player == undefined){
				this.props.socket.emit('player-get', this.state.User.id);
			}
		}else{
			this.props.socket.emit('player-creation');
		}
	}

	componentDidMount() {
		if(!this.state.User.hasChar){
			this.setState({
				inCreation: true
			});
		}
		
		this.props.socket.on("player-creation-response", (data: any) => {
			this.handleCreationResponse(data);
		});

		this.props.socket.on('player-get-response', (data: any) => {
			this.handlePlayerResponse(data);
		});
	}

	handlePlayerResponse(data: any) {
		data.data.nameAndRankString = data.data.rank + ' '+ this.state.User.name;

		this.setState({
			Player: data.data
		});
	}

	handleCreationResponse(data: any) {
		this.setState({
			backstory: data,
		});
	}

	handleCreationSubmit = () => {
		const u = this.state.User;
		u.hasChar = 1;
		
		this.props.socket.emit('player-get', {owner: u.id});

		this.setState({
			User: u
		});
	}

	render() {
		if(this.state.inCreation){
			return (
				<Creation
					handleSubmit={this.handleCreationSubmit}
					backstory={this.state.backstory}
					socket={this.props.socket}
				/>
			);
		}else{
			if (this.props.size == "large") {
				return (
					<Row>
						<Col md="8">
							<GameScreen User={this.state.User} Player={this.state.Player} socket={this.props.socket} />
						</Col>
						<Col md="4">
							<Chat />
						</Col>
					</Row>
				);
			} else {
				return (
					<>
						<div className="chatDiv">
							<ul className="chatHistory"></ul>
						</div>
						<Row>
							<Col sm="auto">
								<GameScreen User={this.state.User} Player={this.state.Player} socket={this.props.socket} />
							</Col>
						</Row>
					</>
				);
			}
		}
	}
}

export default Display;

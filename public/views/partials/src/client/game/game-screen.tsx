import React from "react";
import {Socket} from 'socket.io-client'

import Region from "./region";
import StatBar from "./stat-bar";

type Props = {
	User: DC.User;
	Player: DC.Player;
	socket: Socket;
}

class GameScreen extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<>
				<Region Player={this.props.Player} User={this.props.User} />
				<StatBar Player={this.props.Player} User={this.props.User} />
			</>
		);
	}
}

export default GameScreen;

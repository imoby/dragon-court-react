import React from "react";
import {Socket} from 'socket.io-client'

import Fields from "./regions/fields";
import Town from "./regions/town";

type Props = {
	User: DC.User;
	Player: DC.Player;
}

class Region extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);
	}

	render(): React.ReactNode {
		switch (this.props.Player.region) {
			case "town":
				return <Town Player={this.props.Player} User={this.props.User} />;
				break;

			case "market":
				break;

			case "fields":
				return <Fields Player={this.props.Player} User={this.props.User} />;
				break;

			case "castle":
				break;

			case "forest":
				break;

			case "mountains":
				break;

			case "mounds":
				break;

			case "sea":
				break;
		}
	}
}

export default Region;

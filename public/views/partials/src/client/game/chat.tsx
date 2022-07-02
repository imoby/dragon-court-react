import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function Chat(props: any) {
	return (
		<div className="chatDiv">
    	<ButtonGroup aria-label="Chat Room">
    		<Button variant="secondary">Global</Button>
    		<Button variant="secondary">Guild</Button>
    		<Button variant="secondary">Region</Button>
    	</ButtonGroup>
    	<div className="chatMsgInput">
    		<input type="text" name="chatInput" />
    		<input type="button" className="chatSubmit" name="chatSubmit" value="Chat" />
    	</div>
    	<ul className="chatHistory"></ul>
    </div>
	);
}

export default Chat;

import { Socket } from "socket.io-client";

export {};

declare global {
	interface Window {
		baseURL: string;
		User: DC.User;
		socket: Socket;
	}

	interface globalThis {
		baseURL: string;
		User: DC.User;
		socket: Socket;
	}

	namespace DC {
		type Props = {
			User: DC.User;
			Player?: DC.Player | {};
		};

		interface User {
			id: number;
			name: string;
			email: string;
			hasChar: number;
			firstRun: number;
			chat: number;
			token: string;
		}

		type Skill = {
			skill: number;
			max: number;
		};

		interface Player {
			owner: number;
			rankString: string;
			nameAndRank: string;
			region: string;
			class: string;
			background: string;
			alliance: number;
			effects: string[];
			stats: {
				guts: number;
				gutsMax: number;
				wits: number;
				witsMax: number;
				charm: number;
				charmMax: number;
				attack: number;
				defend: number;
				skill: number;
			};
			skills: { fighter: DC.Skill; magic: DC.Skill; trade: DC.Skill };
			level: number;
			experience: number;
			quests: number;
			questsMax: number;
			cash: number;
			rank: number;
			storage: number;
			storageMax: number;
			fame: number;
			favor: number;
			skilled?: number;
			cashToday?: number;
			expToday?: number;
			gutsToday?: number;
			witsToday?: number;
			charmToday?: number;
			totalGuts?: number;
			totalWits?: number;
			totalCharm?: number;
			totalSkill?: number;
			totalAttack?: number;
			totalDefend?: number;
			questsToday?: number;
			totalGuildSkills?: number;
			inventory?: {};
		}
	}
}

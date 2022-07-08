import { Socket } from "socket.io-client";

export {};
declare module "strings";

declare global {
  interface Window {
    baseURL: string;
    backstory: string;
    User: DC.User;
    Player: DC.Player;
    Items: any[];
    socket: Socket;
  }

  namespace DC {
    interface RequestData {
      status: string;
      data?: any;
      message?: string;
    }

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
      place: string;
      location: string;
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
      inventory?: DC.InventoryItem[];
      equipment?: {
        head: DC.InventoryItem;
        body: DC.InventoryItem;
        feet: DC.InventoryItem;
        left: DC.InventoryItem;
        right: DC.InventoryItem;
      };
      equipmentStrings?: {
        head: string;
        body: string;
        feet: string;
        left: string;
        right: string;
      };
    }

    interface equipment {
      head?: DC.InventoryItem;
      body?: DC.InventoryItem;
      feet?: DC.InventoryItem;
      left?: DC.InventoryItem;
      right?: DC.InventoryItem;
    }

    interface equipmentStrings {
      head?: string;
      body?: string;
      feet?: string;
      left?: string;
      right?: string;
    }

    interface Item {
      id: number;
      item: number;
      name: string;
      region: string;
      shop: string;
      guts: number;
      wits: number;
      charm: number;
      attack: number;
      defend: number;
      skill: number;
      cost: number;
      func: string;
      equippable: number;
      lvl: number;
      maxEnchants: number;
      dropRate: number;
      isSilver: number;
      isCrystal: number;
    }

    interface InventoryItem {
      id: number;
      itemId: number;
      name: string;
      identifiedName?: string;
      region: string;
      shop: string;
      baseGuts: number;
      baseWits: number;
      baseCharm: number;
      baseAttack: number;
      baseDefend: number;
      baseSkill: number;
      cost: number;
      func: string;
      equippable: number;
      maxEnchants: number;
      isSilver: number;
      isCrystal: number;
      qty: number;
      equipped: number;
      identified: number;
      abilities: string;
      guts: number;
      wits: number;
      charm: number;
      attack: number;
      defend: number;
      skill: number;
      timesEnchanted: number;
      inStorage: number;
      requiredLevel: number;
      itemLevel: number;
    }

    interface Strings {
      creation: {
        race: string[];
        adj: string[];
        loc: string[];
        desc: string[];
      };
      awaken: {
        first: string;
        start: string;
        place: {
          tavern: string;
          outside: string;
        };
        location: {
          floor: string;
          room: string;
          suite: string;
        };
        stipend: string;
      };
      shops: {
        court: string[];
        healer: string[];
        tavern: string[];
        weapons: string[];
        armor: string[];
        trade: string[];
        smithy: string[];
      };
    }
  }
}

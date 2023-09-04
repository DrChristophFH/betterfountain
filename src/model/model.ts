import { token } from "../token";
import { Range } from "vscode";
import { ObservableValue, ObservableArray } from "./observables"

class StructToken {
  text: string;
  isnote: boolean;
  id: any;
  children: any; //Children of the section
  range: Range; //Range of the scene/section header
  level: number;
  section: boolean; // true->section, false->scene
  synopses: { synopsis: string; line: number; }[];
  notes: { note: string; line: number; }[];
}

class Character {
  name: ObservableValue<string>; // character name
  scenes: ObservableArray<number>; // scenes numbers the character appears in
  tags: ObservableArray<string>; // character tags (e.g. "protagonist, male")
  actionLength: ObservableValue<number>; // length of action in characters
  dialogueLength: ObservableValue<number>; // length of dialogue in characters
  color: ObservableValue<string>; // color of character 
}

class Location {
  name: ObservableValue<string>; // location name
  scenes: ObservableArray<number>; // scenes numbers the location appears in
}

class Scene {
  name: ObservableValue<string>; // scene name
  text: ObservableValue<string>; // scene text? not sure what exactly didn't look into it
  line: ObservableValue<number>; // line number of scene
  actionLength: ObservableValue<number>; // length of action in characters
  dialogueLength: ObservableValue<number>; // length of dialogue in characters
  interior: ObservableValue<boolean>; // is the scene interior
  exterior: ObservableValue<boolean>; // is the scene exterior
  timeOfDay: ObservableValue<string>; // time of day of scene
}

class ScreenplayProperties {
  lengthAction: ObservableValue<number>; // length of action in characters
  lengthDialogue: ObservableValue<number>; // length of dialogue in characters
  scenes: ObservableArray<Scene>; // array of all scenes
  characters: ObservableArray<Character>; // array of all characters
  locations: ObservableArray<Location>; // array of all locations 

  /**
   * Binary search for the scene at the given line number
   * @param line line number to search for
   * @returns scene at the given line number or null if not found
   */
  public getScene(line: number): Scene | null {
    let scenes = this.scenes.get();
    let low = 0;
    let high = scenes.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (scenes[mid].line.get() < line) {
        low = mid + 1;
      } else if (scenes[mid].line.get() > line) {
        high = mid - 1;
      } else {
        return scenes[mid];
      }
    }
    return null;
  }
}

export class Script {
  private static instance: Script | null = null;

  scriptHtml: string = "";
  titleHtml: string = "";
  titlePage: { [index: string]: token[]; } = {};
  tokens: token[] = [];
  tokenLines: { [line: number]: number; } = {};
  parseTime: number = 0; 
  firstTokenLine: number = 0; 
  titleKeys: string[] = []; 
  fontLine: number = 0; 
  structure: StructToken[] = []; 
  properties: ScreenplayProperties = new ScreenplayProperties();

  private constructor() {} // Singleton

  public static getInstance(): Script {
    if (Script.instance === null) {
      Script.instance = new Script();
    }
    return Script.instance;
  }
}
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
  name: ObservableValue<string>;
  scenes: ObservableArray<number>;
  tags: ObservableArray<string>;
  actionLength: ObservableValue<number>;
  dialogueLength: ObservableValue<number>;
  color: ObservableValue<string>;
}

class Location {
  name: ObservableValue<string>;
  scenes: ObservableArray<number>;
}

class Scene {
  scene: ObservableValue<string>;
  text: ObservableValue<string>;
  line: ObservableValue<number>;
  actionLength: ObservableValue<number>;
  dialogueLength: ObservableValue<number>;
  interior: ObservableValue<boolean>;
  exterior: ObservableValue<boolean>;
  timeOfDay: ObservableValue<string>;
}

class ScreenplayProperties {
  sceneLines: ObservableArray<number>; // is this needed?
  sceneNames: ObservableArray<string>; // is this needed?
  titleKeys: ObservableArray<string>; // what is this?
  firstTokenLine: ObservableValue<number>; // what is this?
  fontLine: ObservableValue<number>; // what is this?
  lengthAction: ObservableValue<number>; // length of action in characters
  lengthDialogue: ObservableValue<number>; // length of dialogue in characters
  scenes: ObservableArray<Scene>; // array of all scenes
  characters: ObservableArray<Character>; // array of all characters
  locations: ObservableArray<Location>; // array of all locations
  structure: StructToken[]; // what is this?
}

export class Script {
  scriptHtml: string;
  titleHtml: string;
  titlePage: { [index: string]: token[]; };
  tokens: token[];
  tokenLines: { [line: number]: number; };
  lengthAction: number; // ditch?
  lengthDialogue: number; // ditch?
  parseTime: number; // ditch?
  properties: ScreenplayProperties;
}
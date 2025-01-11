import SwitchBotSystem from "./switchbot-sys";

export type SwitchBotCert = {
  token: string,
  secret: string,
}

export type CliOptions = {
  deviceId?: string,
  default?: boolean,
}

export type CliCommandExec = (args: string[], options: CliOptions, sys: SwitchBotSystem) => Promise<void>;
export type CliCommandDesc = (args: string[], options: CliOptions) => void;

export type CliCommand = {
  execute: CliCommandExec;
  description: CliCommandDesc;
};

export type SwitchBotCommandPayload = {
  command: string,
  parameter: string,
  commandType: string,
}


import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";
import { sendSwitchbotDeviceCommand } from "./cmd";

export const deviceCmd_turnOn_describe = (argv: string[], options: CliOptions) => {
    console.log(`  device turnOn: turn on the device`);
};

export const deviceCmd_turnOff_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device turnOff: turn off the device`);
};

export const deviceCmd_toggle_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device toggle: toggle the device`);
};

export const deviceCmd_press_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device press: ask the device to press`);
};

export const deviceCmd_pause_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device pause: set to Pause state`);
};

export const deviceCmd_lock_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device lock: lock the smart lock device`);
};

export const deviceCmd_unlock_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device unlock: unlock the smart lock device`);
};

export const deviceCmd_turnOn_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "turnOn");
};

export const deviceCmd_turnOff_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "turnOff");
};

export const deviceCmd_toggle_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "toggle");
};

export const deviceCmd_press_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "press");
};

export const deviceCmd_pause_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "pause");
};

export const deviceCmd_lock_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "lock");
};

export const deviceCmd_unlock_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "unlock");
};

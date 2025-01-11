import { sendSwitchbotDeviceCommand } from "./cmd";
import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";

export const deviceCmd_setAll_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device all <value> : all air conditioner parameters  at same time.`);
  console.log(`                value must be {temperature},{mode},{fan speed},{power state}`);
  console.log(`                {temperature}: number, the unit is in celsius`);
  console.log(`                {mode}: 0 for *auto*, 2 for *cool*, 3 for *dry*, 4 for *fan*, 5 for *hear*`);
  console.log(`                {fan speed}: 1 for *auto*, 2 for *low*, 3 for *medium*, 4 for *high*`);
  console.log(`                {power state}: on or off`);
  console.log(`                 e.g. 26,1,3,on`);
};

export const deviceCmd_setAll_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  if (argv.length < 1) {
    throw new Error("all command requires parameter. try 'device help'");
  }
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "setAll", argv[1]);
};

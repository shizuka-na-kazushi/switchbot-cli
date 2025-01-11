import { sendSwitchbotDeviceCommand } from "./cmd";
import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";

export const deviceCmd_temperature_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device temperature <value> : change color temperature. the value range from 2700 to 6500`);
};

export const deviceCmd_temperature_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  if (argv.length < 1) {
    throw new Error("temperature value is required. the value range from 2700 to 6500");
  }

  let num = parseInt(argv[1]);
  if (num < 2700 || 6500 < num) {
    throw new Error("Color Temperature range must be 2700-6500.");
  }

  await sendSwitchbotDeviceCommand(sys, options.deviceId, "setColorTemperature", num.toString());
};

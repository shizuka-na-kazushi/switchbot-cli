import { sendSwitchbotDeviceCommand } from "./cmd";
import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";

export const deviceCmd_brightness_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device brightness <value> : change brightness. its range from 1 to 100.`);
};

export const deviceCmd_brightness_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  if (argv.length < 1) {
    throw new Error("brightness value is required. range from 1 to 100");
  }

  const num = parseInt(argv[1]);
  if (num < 1 || 100 < num) {
    throw new Error("Brightness range must be 1-100.");
  }

  await sendSwitchbotDeviceCommand(sys, options.deviceId, "setBrightness", num.toString());
};

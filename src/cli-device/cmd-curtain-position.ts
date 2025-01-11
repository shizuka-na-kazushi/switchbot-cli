import { sendSwitchbotDeviceCommand } from "./cmd";
import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";

export const deviceCmd_curtain_position_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device position <value> : set curtain position. format is <index>,<mode>,<position`);
  console.log('                    <index> => ??'),
  console.log('                    <mode> => 0 for performance mode, 1 for silent mode, ff for default');
  console.log('                    <position> => range is 0-100, 0 means open, 100 means closed');
  console.log('                        e.g. "0,ff,80"');
};

export const deviceCmd_curtain_position_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  if (argv.length < 1) {
    throw new Error("position value is required. the value format is {index},{mode},{position}. try 'device help'");
  }

  let param = argv[1];
  // if (!validateCurtainPositionValue(param)) {
  //   throw new Error("RGB value format must be {0-255}:{0-255}:{0-255}");
  // }

  await sendSwitchbotDeviceCommand(sys, options.deviceId, "setPosition", param);
};

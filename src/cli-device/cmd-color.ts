import { sendSwitchbotDeviceCommand } from "./cmd";
import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";

export const deviceCmd_color_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device color <value> : change color (RGB). the value format is {0-255}:{0-255}:{0-255}`);
};

function validateRGBString(rgbStr: string) : boolean {
  // 0-255の数値を表現する正規表現パターン
  const numberPattern = '([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])';
  
  // 完全なRGBパターン：{数値}:{数値}:{数値}
  const rgbPattern = new RegExp(`^${numberPattern}:${numberPattern}:${numberPattern}$`);
  
  return rgbPattern.test(rgbStr);
}

export const deviceCmd_color_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  if (argv.length < 1) {
    throw new Error("color value is required. the value format is {0-255}:{0-255}:{0-255}");
  }

  let param = argv[1];
  if (!validateRGBString(param)) {
    throw new Error("RGB value format must be {0-255}:{0-255}:{0-255}");
  }

  await sendSwitchbotDeviceCommand(sys, options.deviceId, "setColor", param);
};

import SwitchBotSystem from "../switchbot-sys";
import { CliOptions } from "../types";
import { sendSwitchbotDeviceCommand } from "./cmd";

export const deviceCmd_volumeAdd_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device volumeAdd: volume up`);
};

export const deviceCmd_volumeSub_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device volumeSub: volume down`);
};

export const deviceCmd_channelAdd_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device channelAdd: next channel`);
};

export const deviceCmd_channelSub_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device channelSub: previous channel`);
};

export const deviceCmd_mute_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device mute: mute/unmute`);
};

export const deviceCmd_ff_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device ff: fast forward`);
};
export const deviceCmd_rewind_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device rewind: rewind`);
};
export const deviceCmd_next_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device next: go next track`);
};
export const deviceCmd_prev_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device prev: go previous track`);
};
export const deviceCmd_play_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device play: play or resume`);
};
export const deviceCmd_stop_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device stop: stop`);
};

export const deviceCmd_swing_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device swing: swing`);
};

export const deviceCmd_timer_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device timer: set timer`);
};

export const deviceCmd_lowSpeed_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device low: set fan speed to low`);
};

export const deviceCmd_middleSpeed_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device mid: set fan speed to medium`);
};

export const deviceCmd_highSpeed_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device high: set fan speed to high`);
};

export const deviceCmd_brightnessUp_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device brightnessUp: brightness Up`);
};

export const deviceCmd_brightnessDown_describe = (argv: string[], options: CliOptions) => {
  console.log(`  device brightnessDown: brightness Down`);
};


export const deviceCmd_volumeAdd_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "volumeAdd");
};

export const deviceCmd_volumeSub_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "volumeSub");
};

export const deviceCmd_channelAdd_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "channelAdd");
};

export const deviceCmd_channelSub_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "channelSub");
};

export const deviceCmd_mute_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "setMute");
};

export const deviceCmd_ff_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "FastForward");
};
export const deviceCmd_rewind_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "Rewind");
};
export const deviceCmd_next_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "Next");
};
export const deviceCmd_prev_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "Previous");
};
export const deviceCmd_play_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "Play");
};
export const deviceCmd_stop_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "Stop");
};

export const deviceCmd_swing_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "swing");
};

export const deviceCmd_timer_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "timer");
};

export const deviceCmd_lowSpeed_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "lowSpeed");
};

export const deviceCmd_middleSpeed_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "middleSpeed");
};

export const deviceCmd_highSpeed_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "highSpeed");
};

export const deviceCmd_brightnessUp_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "brightnessUp");
};

export const deviceCmd_brightnessDown_execute = async (argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> => {
  await sendSwitchbotDeviceCommand(sys, options.deviceId, "brightnessDown");
};

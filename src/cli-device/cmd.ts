import SwitchBotSystem from "../switchbot-sys";
import { CliCommand, CliOptions, SwitchBotCommandPayload } from "../types";
import { 
  deviceCmd_lock_describe, 
  deviceCmd_lock_execute, 
  deviceCmd_pause_describe, 
  deviceCmd_pause_execute, 
  deviceCmd_press_describe, 
  deviceCmd_press_execute, 
  deviceCmd_toggle_describe, 
  deviceCmd_toggle_execute, 
  deviceCmd_turnOff_describe, 
  deviceCmd_turnOff_execute, 
  deviceCmd_turnOn_describe, 
  deviceCmd_turnOn_execute, 
  deviceCmd_unlock_describe, 
  deviceCmd_unlock_execute} from "./cmd-generic";
import { deviceCmd_temperature_describe, deviceCmd_temperature_execute } from "./cmd-temperature";
import { deviceCmd_brightness_describe, deviceCmd_brightness_execute } from "./cmd-brightness";
import { deviceCmd_setAll_describe, deviceCmd_setAll_execute } from "./cmd-setAll";
import { deviceCmd_color_describe, deviceCmd_color_execute } from "./cmd-color";
import { deviceCmd_curtain_position_describe, deviceCmd_curtain_position_execute } from "./cmd-curtain-position";
import { 
  deviceCmd_brightnessDown_describe,
  deviceCmd_brightnessDown_execute,
  deviceCmd_brightnessUp_describe,
  deviceCmd_brightnessUp_execute,
  deviceCmd_channelAdd_describe, 
  deviceCmd_channelAdd_execute, 
  deviceCmd_channelSub_describe, 
  deviceCmd_channelSub_execute, 
  deviceCmd_ff_describe, 
  deviceCmd_ff_execute, 
  deviceCmd_highSpeed_describe, 
  deviceCmd_highSpeed_execute, 
  deviceCmd_lowSpeed_describe, 
  deviceCmd_lowSpeed_execute, 
  deviceCmd_middleSpeed_describe, 
  deviceCmd_middleSpeed_execute, 
  deviceCmd_next_describe, 
  deviceCmd_next_execute, 
  deviceCmd_play_describe, 
  deviceCmd_play_execute, 
  deviceCmd_prev_describe, 
  deviceCmd_prev_execute, 
  deviceCmd_rewind_describe, 
  deviceCmd_rewind_execute, 
  deviceCmd_stop_describe, 
  deviceCmd_stop_execute, 
  deviceCmd_swing_describe, 
  deviceCmd_swing_execute, 
  deviceCmd_timer_describe, 
  deviceCmd_timer_execute, 
  deviceCmd_volumeAdd_describe, 
  deviceCmd_volumeAdd_execute, 
  deviceCmd_volumeSub_describe, 
  deviceCmd_volumeSub_execute } from "./cmd-infrared";

type SwitchBotDeviceSupportCommand = {
  argument: string,
  command: CliCommand,
}

const commandList : {deviceType: string, supportCommands: SwitchBotDeviceSupportCommand[]}[] = [
  {deviceType: "Bot", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "press", command:  {execute: deviceCmd_press_execute,  description: deviceCmd_press_describe}},
  ]},
  {deviceType: "Curtain", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "pause", command:  {execute: deviceCmd_pause_execute,  description: deviceCmd_pause_describe}},
    {argument: "position", command:  {execute: deviceCmd_curtain_position_execute,  description: deviceCmd_curtain_position_describe}},
  ]},
  {deviceType: "Curtain3", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "pause", command:  {execute: deviceCmd_pause_execute,  description: deviceCmd_pause_describe}},
    {argument: "position", command:  {execute: deviceCmd_curtain_position_execute,  description: deviceCmd_curtain_position_describe}},
  ]},
  {deviceType: "Smart Lock", supportCommands: [
    {argument: "lock", command:   {execute: deviceCmd_lock_execute,   description: deviceCmd_lock_describe}},
    {argument: "unlock", command:  {execute: deviceCmd_unlock_execute,  description: deviceCmd_unlock_describe}},
  ]},
  {deviceType: "Smart Lock Pro", supportCommands: [
    {argument: "lock", command:   {execute: deviceCmd_lock_execute,   description: deviceCmd_lock_describe}},
    {argument: "unlock", command:  {execute: deviceCmd_unlock_execute,  description: deviceCmd_unlock_describe}},
  ]},
  {deviceType: "Plug Mini (JP)", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "toggle", command:  {execute: deviceCmd_toggle_execute,  description: deviceCmd_toggle_describe}},
  ]},
  {deviceType: "Color Bulb", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "toggle", command:  {execute: deviceCmd_toggle_execute,  description: deviceCmd_toggle_describe}},
    {argument: "brightness", command: {execute: deviceCmd_brightness_execute, description: deviceCmd_brightness_describe}},
    {argument: "color", command: {execute: deviceCmd_color_execute, description: deviceCmd_color_describe}},
    {argument: "temperature", command: {execute: deviceCmd_temperature_execute, description: deviceCmd_temperature_describe}},
  ]},
  {deviceType: "Strip Light", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "toggle", command:  {execute: deviceCmd_toggle_execute,  description: deviceCmd_toggle_describe}},
    {argument: "brightness", command: {execute: deviceCmd_brightness_execute, description: deviceCmd_brightness_describe}},
    {argument: "color", command: {execute: deviceCmd_color_execute, description: deviceCmd_color_describe}},
  ]},

  /** infrared devices */
  {deviceType: "Air Conditioner", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "all", command:  {execute: deviceCmd_setAll_execute,  description: deviceCmd_setAll_describe}},
  ]},
  {deviceType: "TV", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "volumeAdd", command:  {execute: deviceCmd_volumeAdd_execute,  description: deviceCmd_volumeAdd_describe}},
    {argument: "volumeSub", command:  {execute: deviceCmd_volumeSub_execute,  description: deviceCmd_volumeSub_describe}},
    {argument: "channelAdd", command:  {execute: deviceCmd_channelAdd_execute,  description: deviceCmd_channelAdd_describe}},
    {argument: "channelSub", command:  {execute: deviceCmd_channelSub_execute,  description: deviceCmd_channelSub_describe}},
  ]},
  {deviceType: "Speaker", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "volumeAdd", command:  {execute: deviceCmd_volumeAdd_execute,  description: deviceCmd_volumeAdd_describe}},
    {argument: "volumeSub", command:  {execute: deviceCmd_volumeSub_execute,  description: deviceCmd_volumeSub_describe}},
    {argument: "ff", command:  {execute: deviceCmd_ff_execute,  description: deviceCmd_ff_describe}},
    {argument: "rewind", command:  {execute: deviceCmd_rewind_execute,  description: deviceCmd_rewind_describe}},
    {argument: "next", command:  {execute: deviceCmd_next_execute,  description: deviceCmd_next_describe}},
    {argument: "prev", command:  {execute: deviceCmd_prev_execute,  description: deviceCmd_prev_describe}},
    {argument: "pause", command:  {execute: deviceCmd_pause_execute,  description: deviceCmd_pause_describe}},
    {argument: "play", command:  {execute: deviceCmd_play_execute,  description: deviceCmd_play_describe}},
    {argument: "stop", command:  {execute: deviceCmd_stop_execute,  description: deviceCmd_stop_describe}},
  ]},
  {deviceType: "Fan", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "swing", command:  {execute: deviceCmd_swing_execute,  description: deviceCmd_swing_describe}},
    {argument: "timer", command:  {execute: deviceCmd_timer_execute,  description: deviceCmd_timer_describe}},
    {argument: "low", command:  {execute: deviceCmd_lowSpeed_execute,  description: deviceCmd_lowSpeed_describe}},
    {argument: "mid", command:  {execute: deviceCmd_middleSpeed_execute,  description: deviceCmd_middleSpeed_describe}},
    {argument: "high", command:  {execute: deviceCmd_highSpeed_execute,  description: deviceCmd_highSpeed_describe}},
  ]},
  {deviceType: "Light", supportCommands: [
    {argument: "turnOn", command:   {execute: deviceCmd_turnOn_execute,   description: deviceCmd_turnOn_describe}},
    {argument: "turnOff", command:  {execute: deviceCmd_turnOff_execute,  description: deviceCmd_turnOff_describe}},
    {argument: "brightnessUp", command:  {execute: deviceCmd_brightnessUp_execute,  description: deviceCmd_brightnessUp_describe}},
    {argument: "brightnessDown", command:  {execute: deviceCmd_brightnessDown_execute,  description: deviceCmd_brightnessDown_describe}},
  ]},
];

/**
 * 
 * @param sys 
 * @param deviceId 
 * @param command 
 * @param parameter 
 */
export async function sendSwitchbotDeviceCommand(sys: SwitchBotSystem, deviceId: string | undefined, command: string, parameter: string = "default") : Promise<void> {
  if (!deviceId) {
    throw new Error("deviceId is required. execute 'device use' command or '-d' option with appropriate deviceId");
  }

  let device = await sys.retrieveDevice(deviceId);
  if (!device) {
    throw new Error(`deviceId:"${deviceId}" is not found. select appropriate value as deviceId`);
  }
  const payload : SwitchBotCommandPayload = {command, commandType: "command", parameter};
  const sbhttp = sys.getHttp();
  const jsonObj = await sbhttp.deviceCommand(deviceId, payload);
  if (jsonObj && jsonObj.message) {
    console.log(`SwitchBot cloud returns: ${jsonObj.message}`);
  }
}

function findSupportCmdEntity(device: any) : {deviceType: string, supportCommands: SwitchBotDeviceSupportCommand[]} | undefined 
{
  let supportCmdEntity;
  if (device.deviceType) {
    supportCmdEntity = commandList.find((item) => item.deviceType === device.deviceType);
  } else if (device.remoteType) {
    supportCmdEntity = commandList.find((item) => device.remoteType === item.deviceType || device.remoteType === ("DIY " + item.deviceType));
  }
  return supportCmdEntity;
}

/**
 * 
 * @param argv 
 * @param options 
 * @param sys 
 * @returns 
 */
export async function executeDeviceCommand(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  if (!options.deviceId) {
    throw new Error("deviceId is required. execute 'device use' command or '-d' option with appropriate deviceId");
  } 

  if (argv.length <= 0) {
    return;
  }

  let device = await sys.retrieveDevice(options.deviceId);
  if (!device) {
    throw new Error(`deviceId:"${options.deviceId}" is not found. select appropriate value as deviceId`);
  }

  let deviceType = (device.deviceType || device.remoteType);
  const supportCmdEntity = findSupportCmdEntity(device);
  if (!supportCmdEntity) {
    throw new Error(`deviceType "${deviceType}" is not supported!`);
  }

  const cmd = supportCmdEntity.supportCommands.find((item) => item.argument === argv[0]);
  if (!cmd) {
    throw new Error(`command "${argv[0]}" is not supported on deviceType "${deviceType}"`);
  }

  await cmd.command.execute(argv, options, sys);
}

/**
 * 
 * @param argv 
 * @param options 
 * @param sys 
 * @returns 
 */
export async function describeDeviceCommand(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  if (!options.deviceId) {
    return;
  } 

  let device = await sys.retrieveDevice(options.deviceId);
  if (!device) {
    return;
  }

  let deviceType = (device.deviceType || device.remoteType);
  const supportCmdEntity = findSupportCmdEntity(device);
  if (!supportCmdEntity) {
    return;
  }

  console.log("");
  console.log(`  Available device sub command for this device "${device.deviceName}" type="${deviceType}" :`);
  console.log("");
  supportCmdEntity.supportCommands.forEach((item) => {
    item.command.description(argv, options);
  });
}

#!/usr/bin/env node

import CliMain from "./cli-main";

CliMain(process.argv);

/**
 * 
 * 
 * 
 * Usage:
 * 
 * [device]
 * switchbot-cli device list
 *   deviceId type hubId name
 * 
 * switchbot-cli device use deviceId
 *  selected the specific device as default. afterwords, cli command uses the device.
 * 
 * switchbot-cli device unuse
 *  unselect or forget default device
 * 
 * switchbot-cli
 *  prompt token/secret if it's not set
 * 
 * switchbot-cli
 *  print help
 * 
 * switchbot-cli device
 *    same as "device list" command unless any default device is selected by "device use" command
 * 
 * switchbot-cli device
 *  print available commands for default device, if default device is selected by "device use" command
 * 
 * switchbot-cli device -d <deviceId>
 *  print available commands for the specific device
 *    
 * switchbot-cli device help
 *  print help message for the selected device. if no device selected, print only usage of cli.
 * 
 * switchbot-cli device [-d <deviceId>] turnOn
 *  turn on the specified device.
 * 
 * switchbot-cli device [-d <deviceId>] status
 *  print device status
 * 
 * 
 * [scene]
 * switchbot-cli scene
 *   print scenes the user created
 * 
 * switchbot-cli scene <scene-id>
 *   execute the scene specified by scene-id
 */

/**
 * Hidden files:
 * 
 * ~/.switchbot-cli
 */
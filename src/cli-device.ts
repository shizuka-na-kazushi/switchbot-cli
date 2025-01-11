import SwitchBotSystem from "./switchbot-sys";
import { printFmtDevices } from "./switchbot-format";
import { CliCommand, CliOptions } from "./types";
import { describeDeviceCommand, executeDeviceCommand } from "./cli-device/cmd";


const cmdList : Record<string, CliCommand> = {
  list: {execute: executeCommand_List, description: describeCommand_List},
  help: {execute: executeCommand_Help, description: describeCommand_Help},
  unuse: {execute: executeCommand_Unuse, description: describeCommand_Unuse},
  use: {execute: executeCommand_Use, description: describeCommand_Use},
  status: {execute: executeCommand_Status, description: describeCommand_Status},
};

const about_Device = (argv: string[], options: CliOptions) => {
  console.log(`----
device:
   
  'device' sub command

    'device' sub command usually takes '-d <deviceId>' option.
    Or, once device is selected by 'device use <deviceId> command, it will be used as default device for other 'device' sub command.

  Available sub commands are:

`);

  Object.entries(cmdList).forEach(([name, command]) => {
    command.description(argv, options);
  });
};

async function executeCommand_List(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  const json = await sys.devices(true);
  printFmtDevices(json);
}

async function executeCommand_Help(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  if (!options.deviceId) {
    about_Device(argv, options);
    return;
  } 

  let device = await sys.retrieveDevice(options.deviceId);
  if (!device || (device && !device.deviceType) || (device && !device.remoteType)) {
    about_Device(argv, options);
  }

  await describeDeviceCommand(argv, options, sys);
}

async function executeCommand_Unuse(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  await sys.unselectDevice();
}

async function executeCommand_Use(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {

  let id = null;
  if (argv.length <= 1) {
    id = await sys.selectedDeviceId();
    if (!id) {
      console.log("<deviceId> is required");
      return;
    }
  } else {
    id = argv[1];
    await sys.selectTheDevice(id);
  }

  let device = await sys.retrieveDevice(id);
  if (device && (device.deviceType || device.remoteType) && device.deviceName) {
    console.warn(`using device: "${id}" "${device.deviceType || device.remoteType}" "${device.deviceName}"`);
  } else {
    console.warn(`Warning: device ("${id}") is selected. however, something is wrong.`);
  }
  return;
}

async function executeCommand_Status(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  if (!options.deviceId) {
    throw new Error("deviceId is required. execute 'device use' command or '-d' option with appropriate deviceId");
  } 

  const sbhttp = sys.getHttp();
  const json = await sbhttp.deviceStatus(options.deviceId);
  console.log(JSON.stringify(json, null, ' '));
}

function describeCommand_List(argv: string[], options: CliOptions) {
  console.log("  device list: show list of all registered devices");
}

function describeCommand_Help(argv: string[], options: CliOptions) {
  console.log("  device help: show help for device specific commands, if deviceId is specified.");
}


function describeCommand_Unuse(argv: string[], options: CliOptions) {
  console.log("  device unuse: remove/forget selected device");
}

function describeCommand_Use(argv: string[], options: CliOptions) {
  console.log("  device use <deviceId>: select specific device as default. afterwords, cli command uses the device.");
}

function describeCommand_Status(argv: string[], options: CliOptions) {
  console.log("  device status: show device status specified by -d <deviceId> option or selected by device use <deviceId> command");
}

async function parseCliCommands(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<{argv: string[], options: CliOptions}> {
  let deviceId = await sys.selectedDeviceId();
  if (deviceId) {
    options.deviceId = deviceId;
  }

  if (argv.length <= 1) {
    options.default = true;
    argv = argv.slice(1);
    return {argv, options};
  }

  if (argv[1] === "-d") {
    if (argv.length <= 2) {
      throw new Error("no deviceId specified");
    }
    options.deviceId = argv[2];
    argv = argv.slice(3);
    if (argv.length <= 0) {
      options.default = true;
    }
  } else {
    argv = argv.slice(1);
  }

  return {argv, options};
}

async function subCommand_DeviceExecute(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  const ret = await parseCliCommands(argv, options, sys);
  argv = ret.argv;
  options = ret.options;

  if (options.default && !options.deviceId) {
    await executeCommand_Help(argv, options, sys);
  } else if (options.default && options.deviceId) {
    await executeCommand_Status(argv, options, sys);
  }

  let entity = cmdList[argv[0]];
  if (entity) {
    await entity.execute(argv, options, sys);
    return;
  }

  await executeDeviceCommand(argv, options, sys);
}

export const subCommand_Device : CliCommand = {
  description: about_Device,
  execute: subCommand_DeviceExecute,
};

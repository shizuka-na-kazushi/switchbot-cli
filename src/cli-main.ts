import { subCommand_Device } from "./cli-device";
import { subCommand_Scene } from "./cli-scene";
import promptSecret from "./prompt-secret";
import SwitchBotSystem from "./switchbot-sys";
import { CliCommand, CliCommandDesc, CliOptions } from "./types";
import { XDGPaths } from "./xdgpath";
import getPackageJson from "./cli-ver";


const SET_EXIT_CODE = (code: number) => {process.on("exit", () => process.exit(code));}

const describeSwitchBotCli : CliCommandDesc = (argv: string[], options: CliOptions) => {

  const pkgJson = getPackageJson();

    console.log(`
${pkgJson.description} - version: ${pkgJson.version}

'switchbot-cli' takes sub commands below:

help: show this message.`);
    Object.entries(subcommands).forEach(([name, cmd]) => {
      if (name != "help") cmd.description(argv, options);
    });
}

const subCommand_Help : CliCommand = {
  execute: async (argv: string[], options: CliOptions, sys: SwitchBotSystem) => {
    describeSwitchBotCli(argv, options);
  },
  description: describeSwitchBotCli
};

const subCommand_Version : CliCommand = {
  execute: async (argv: string[], options: CliOptions, sys: SwitchBotSystem) => {
    const pkgJson = getPackageJson();
    console.log(`version: ${pkgJson.version}`);
  },
  description: (argv: string[], options: CliOptions) => {console.log("version: show the version")}
};

const subCommand_Clean : CliCommand = {
  execute: async (argv: string[], options: CliOptions, sys: SwitchBotSystem) => {
    const xdg = new XDGPaths();
    await xdg.clean();
  },
  description: (argv: string[], options: CliOptions) => {
    console.log("clean: remove all cache data");
  }
}

const subcommands : Record<string, CliCommand> = {
  help: subCommand_Help,
  version: subCommand_Version,
  clean: subCommand_Clean,
  device: subCommand_Device,
  scene: subCommand_Scene,
};

async function processCert(sys: SwitchBotSystem) : Promise<void> {
  console.log("");
  console.log("");
  console.log("First please register 'token' and 'secret' obtained by SwitchBot mobile app:");

  let token = await promptSecret("token");
  while (!token || token.length <= 0) {
    token = await promptSecret("token");
  }
  let secret = await promptSecret("secret");
  while (!secret || secret.length <= 0) {
    secret = await promptSecret("secret");
  }

  await sys.registerCert(token, secret);

  console.log("");
  console.log("token, secret is registered. execute 'device' command to show all switchbot devices!");
  console.log(""); 
}

export default async function CliMain(argv: string[]) {

  const sys = new SwitchBotSystem();
  await sys.init();

  let options: CliOptions = {};

  let isCertRegistered = await sys.isCertRegistered();
  if (argv.length <= 1 || !isCertRegistered) {
    describeSwitchBotCli(argv, options);
    await processCert(sys);
    SET_EXIT_CODE(0);
    return;
  }

  let subcmd = subcommands[argv[2]];

  if (!subcmd) {
    console.log(`unknown command: "${argv[2]}"
      `);
    describeSwitchBotCli(argv, options);
  } else {
    try {
      await subcmd.execute(argv.slice(2), options, sys);
      SET_EXIT_CODE(0);
    } catch (e: any) {
      // console.log(e);
      console.log(e.message);
      SET_EXIT_CODE(-1);
    }
  }
}
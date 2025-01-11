import { printFmtScenes } from "./switchbot-format";
import SwitchBotSystem from "./switchbot-sys";
import { CliCommand, CliOptions } from "./types";


const cmdList : Record<string, CliCommand> = {
  list: {execute: executeCommand_List, description: describeCommand_List},
  exec: {execute: executeCommand_Exec, description: describeCommand_Exec},
};

export const subCommand_Scene: CliCommand = {
  execute: Scene_Execute,
  description: (argv: string[], options: CliOptions) => {
    console.log(`---
scene:
   
  'scene' sub command

  Available sub commands are:
`);

    Object.entries(cmdList).forEach(([name, command]) => {
      command.description(argv, options);
    }); 
}
};

async function executeCommand_List(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> 
{
  const https = sys.getHttp();
  const scenes = await https.scenes();
  printFmtScenes(scenes);
}

async function executeCommand_Exec(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> 
{
  if (argv.length <= 1) {
    throw new Error("sceneId is required.");
  }

  const https = sys.getHttp();
  let jsonObj = await https.executeScene(argv[1]);
  if (jsonObj && jsonObj.message) {
    console.log(`SwitchBot cloud returns: ${jsonObj.message}`);
  }
}

async function executeCommand_Help(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> 
{
  await subCommand_Scene.execute(argv, options, sys);
}

function describeCommand_List(argv: string[], options: CliOptions) {
  console.log("  scene list: show list of all registered scene. can get sceneId(s) used by other sub command afterwords");
}

function describeCommand_Exec(argv: string[], options: CliOptions) {
  console.log("  scene exec <sceneId>: execute the scene specified by <sceneId>");
}

async function parseCliCommands(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<{argv: string[], options: CliOptions}> {

  if (argv.length <= 1) {
    options.default = true;
  }

  argv = argv.slice(1);
  return {argv, options};
}

async function Scene_Execute(argv: string[], options: CliOptions, sys: SwitchBotSystem) : Promise<void> {
  const ret = await parseCliCommands(argv, options, sys);
  argv = ret.argv;
  options = ret.options;

  if (options.default) {
    await executeCommand_List(argv, options, sys);
    return;
  }

  let entity = cmdList[argv[0]];
  if (entity) {
    await entity.execute(argv, options, sys);
    return;
  }

  /**
   * command not found
   */
  console.log(`${argv[0]}: unknown command`);
  console.log("");
  subCommand_Scene.description(argv, options);
}


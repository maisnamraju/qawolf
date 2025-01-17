import program from "commander";
import { yellow } from "kleur";
import { buildHowlCommand } from "./howlCommand";
import { buildTestCommand } from "./testCommand";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../../package.json");

program.usage("<command> [options]").version(pkg.version);

program.addCommand(buildHowlCommand());
program.addCommand(buildTestCommand());

program.arguments("<command>").action((cmd) => {
  console.log(yellow(`Invalid command "${cmd}"\n`));
  program.help();
});

program.allowUnknownOption(false);

export const runCli = (
  argv: string[] = process.argv
): Promise<program.CommanderStatic> => program.parseAsync(argv);

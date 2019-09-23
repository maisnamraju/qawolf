#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import program from "commander";
import figlet from "figlet";
import { BrowserRunner } from "./BrowserRunner";
import { CONFIG } from "./config";
import { Server } from "./io/Server";
import { buildScreenshotCallback } from "./screenshot";
import { Job, BrowserStep } from "./types";

clear();

console.log(
  chalk.green(figlet.textSync("qawolf", { horizontalLayout: "full" }))
);

program.version("0.0.1").description("Effortless smoke tests");

program
  .command("run")
  .description("run a test")
  .action(async (source, destination) => {
    const steps: BrowserStep[] = [
      {
        selector: {
          xpath: '//*[@id="username"]'
        },
        type: "type",
        value: "tomsmith"
      },
      {
        selector: {
          xpath: '//*[@id="password"]'
        },
        type: "type",
        value: "SuperSecretPassword!"
      },
      {
        selector: {
          xpath: '//*[@id="login"]/button'
        },
        type: "click"
      }
    ];

    const job: Job = {
      href: `${CONFIG.testUrl}/login`,
      steps
    };
    const server = new Server();
    await server.listen();

    const takeScreenshot = buildScreenshotCallback(1000);

    const callbacks = {
      beforeStep: [takeScreenshot],
      afterRun: [takeScreenshot]
    };

    const runner = new BrowserRunner({ callbacks, server });
    await runner.run(job);

    await runner.close();
  });

program.parse(process.argv);

program.outputHelp();

import { readFileSync } from "fs-extra";
import { compile } from "handlebars";
import { camelCase } from "lodash";
import { resolve } from "path";
import { formatLaunch } from "./formatLaunch";

type BuildCodeOptions = {
  createSymbol: string;
  device?: string;
  isTest?: boolean;
  name: string;
  url: string;
};

const scriptTemplate = compile(
  readFileSync(resolve(__dirname, "../static/script.hbs"), "utf8")
);

const testTemplate = compile(
  readFileSync(resolve(__dirname, "../static/test.hbs"), "utf8")
);

export const buildInitialCode = (options: BuildCodeOptions) => {
  const template = options.isTest ? testTemplate : scriptTemplate;

  const code = template({
    createSymbol: options.createSymbol,
    launch: formatLaunch(options.url, options.device),
    name: camelCase(options.name),
    url: options.url
  });

  return code;
};

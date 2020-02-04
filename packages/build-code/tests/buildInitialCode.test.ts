import { buildInitialCode } from "../src/buildInitialCode";
import { CREATE_SYMBOL } from "../src/CodeBuilder";

const launchOptions = {
  createSymbol: CREATE_SYMBOL,
  name: "login",
  url: "http://localhost"
};

describe("buildInitialCode", () => {
  it("builds a script for a workflow", async () => {
    let code = buildInitialCode({
      ...launchOptions,
      isTest: false
    });
    expect(code).toMatchSnapshot();

    code = buildInitialCode({
      ...launchOptions,
      device: "iPhone 7",
      isTest: false
    });
    expect(code).toMatchSnapshot();
  });

  it("builds a test for a workflow", async () => {
    let code = buildInitialCode({ ...launchOptions, isTest: true });
    expect(code).toMatchSnapshot();

    code = buildInitialCode({
      ...launchOptions,
      device: "iPhone 7",
      isTest: true
    });
    expect(code).toMatchSnapshot();
  });
});

import * as packageJson from '../src/packageJson';
import { promises as fs } from 'fs';

describe('readPackageJson', () => {
  const { readPackageJson } = packageJson;

  it('loads package.json relative to cwd', async () => {
    const pkg = await readPackageJson();
    expect(pkg.name).toEqual('create-qawolf');
  });

  it('throws an error when there is no package.json', async () => {
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('/fakedir');
    await expect(readPackageJson()).rejects.toMatchInlineSnapshot(
      `[Error: cannot read package.json]`,
    );
    spy.mockRestore();
  });
});

describe('addDevDependencies', () => {
  let readPackageJsonSpy: jest.SpyInstance;
  let writeFileSpy: jest.SpyInstance;

  beforeAll(() => {
    readPackageJsonSpy = jest.spyOn(packageJson, 'readPackageJson');
    readPackageJsonSpy.mockResolvedValue({
      name: 'mypackage',
      devDependencies: { a: '*', z: '*' },
    });

    writeFileSpy = jest.spyOn(fs, 'writeFile');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeFileSpy.mockImplementation(async () => {});
  });

  afterAll(() => {
    readPackageJsonSpy.mockRestore();
    writeFileSpy.mockRestore();
  });

  it('adds devDependencies alphabetically', async () => {
    await packageJson.addDevDependencies(true);

    expect(writeFileSpy.mock.calls[0][1]).toMatchInlineSnapshot(`
"{
  \\"name\\": \\"mypackage\\",
  \\"devDependencies\\": {
    \\"@types/debug\\": \\"^4.1.5\\",
    \\"@types/jest\\": \\"^25.1.3\\",
    \\"@types/node\\": \\"^12.12.28\\",
    \\"a\\": \\"*\\",
    \\"jest\\": \\"~25.1.0\\",
    \\"playwright\\": \\"0.11.1-next.1583909126688\\",
    \\"qawolf\\": \\"0.12.3-4\\",
    \\"ts-jest\\": \\"^25.2.1\\",
    \\"ts-node\\": \\"^8.6.2\\",
    \\"z\\": \\"*\\"
  }
}
"
`);
  });

  it('does not add jest to create-react-app', async () => {
    readPackageJsonSpy.mockResolvedValue({
      name: 'my-create-react-app',
      dependencies: { 'react-scripts': '*' },
    });

    const packages = await packageJson.addDevDependencies(true);
    expect(packages['jest']).toBeUndefined();
  });
});

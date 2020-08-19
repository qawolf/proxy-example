const createTemplate = (options) => {
  const { name, url } = options;

  const code = `const qawolf = require("qawolf");

let browser;
let page;

beforeAll(async () => {
  browser = await qawolf.launch({
    headless: false,
    proxy: {
      server: "http://168.169.96.2:8080",
    },
  });

  // ignore https errors since the example proxy has issues
  // this should not be necessary normally
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test('${name}', async () => {
  await page.goto("${url}");
  await qawolf.create();
});`;

  return code;
};

module.exports = {
  config: "node_modules/qawolf/js-jest.config.json",
  createTemplate,
  rootDir: ".qawolf",
  testTimeout: 60000,
  useTypeScript: false,
};

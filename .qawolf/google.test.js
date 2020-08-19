const qawolf = require("qawolf");

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

test("visa", async () => {
  await page.goto("https://google.com/");
  await page.fill('[aria-label="Search"]', "hello world");
  await page.press('[aria-label="Search"]', "Enter");
  await qawolf.scroll(page, "html", { x: 0, y: 1344 });
  await page.click(
    '[href="https://en.wikipedia.org/wiki/%22Hello,_World!%22_program"]'
  );
});

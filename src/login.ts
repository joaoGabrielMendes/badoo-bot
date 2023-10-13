import puppeteer, { ElementHandle, KnownDevices, Page } from "puppeteer";
import * as dt from "dotenv";
dt.config();
import { xPath } from "./selectors/selectors";

const badooEmail = process.env.BADOO_EMAIL;
const badooPassword = process.env.BADOO_PASSWORD;

async function click(element: ElementHandle<Node>) {
  if (element) {
    await (element as ElementHandle<Element>).click();
  }
}

async function login(): Promise<Page> {
  const browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  await page.emulate(KnownDevices["iPhone 6"]);

  await page.goto(
    "https://badoo.com/pt/landing/-/-/-/-/-/-/-/-/-/-/-/-/landing"
  );
  await new Promise((r) => setTimeout(r, 3200));
  await page.goto("https://badoo.com/pt/signin");

  // type into email
  await page.waitForSelector("#signin-name");
  await page.click("#signin-name");
  await page.keyboard.type(badooEmail!);

  // type into password
  await page.waitForSelector("#signin-password");
  await page.click("#signin-password");
  await page.keyboard.type(badooPassword!);

  await new Promise((r) => setTimeout(r, 3200));

  // confirm login
  await page.waitForXPath(xPath.badoo_btn_login);
  const [badooBtnLogin] = await page.$x(xPath.badoo_btn_login);
  await click(badooBtnLogin);
  console.log("logged into badoo");

  return page;
}

export default login;

import puppeteer, { ElementHandle, Page, KnownDevices } from "puppeteer";
import * as fs from "fs";
import * as dt from "dotenv";
dt.config();

const badooEmail = process.env.BADOO_EMAIL;
const badooPassword = process.env.BADOO_PASSWORD;

const xPath = {
  badoo_btn_login: '//*[@id="signin-submit"]/button',
  badoo_confirm_cookies_btn:
    "/html/body/div/div[2]/div[2]/div[2]/div[4]/div/button[2]",
  badoo_swipe_like:
    "/html/body/div[1]/div/div[1]/div/div/div[2]/div[2]/div/div/div[3]/div/div/div[3]/div/button",
  badoo_swipe_x:
    "/html/body/div[1]/div/div[1]/div/div/div[2]/div[2]/div/div/div[3]/div/div/div[2]/div/button",
};

const selector = {
  btn_like: '[data-qa="profile-card-action-vote-yes"]',
  btn_nope: '[data-qa="profile-card-action-vote-no"]',
  btn_say_hi: '[data-qa="mutual-attraction-cta"]',
};

async function click(element: ElementHandle<Node>) {
  if (element) {
    await (element as ElementHandle<Element>).click();
  }
}

function swipeTime(): number {
  const min = 1000;
  const max = 5000;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomElement(like: string, nope: string): string {
  const random = Math.random();
  if (random <= 0.85) {
    console.log("like");
    return like;
  } else {
    console.log("X");
    return nope;
  }
}

const userAgent =
  "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Mobile Safari/537.36";
const iPhone = KnownDevices["iPhone 6"];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);
  await page.emulate(iPhone);

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

  await new Promise((r) => setTimeout(r, 4000));

  console.log("// loading xpath buttons");
  // loading xpath buttons

  await page.waitForSelector(selector.btn_like);
  await page.waitForSelector(selector.btn_nope);

  console.log("swipe randomly");
  //await randomSwipe(swipeLike, swipeX, page);

  while (true) {
    const element = await page.$(selector.btn_say_hi);
    if (!element) {
      await await page.click(
        randomElement(selector.btn_like, selector.btn_nope)
      );
      await new Promise((r) => setTimeout(r, swipeTime()));
    } else {
      await element.click();
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  browser.close();
  console.log("success");
})();

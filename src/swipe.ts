import puppeteer, { Page, ElementHandle } from "puppeteer";
import { selector, xPath } from "./selectors/selectors";
import login from "./login";

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

async function Swipe(): Promise<Page> {
  const page = await login();
  await new Promise((r) => setTimeout(r, 4000));

  await page.waitForSelector(selector.btn_like);
  await page.waitForSelector(selector.btn_nope);

  console.log("swipe randomly: ");
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
  return page;
}

export default Swipe;

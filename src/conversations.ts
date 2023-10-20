import { Page } from "puppeteer";
import login from "./login";
import { selector } from "./selectors/selectors";
import { Interface } from "readline";
import ChatGpt from "./utils/openia";
import * as dt from "dotenv";
dt.config();

const badooName = process.env.BADOO_NAME;

interface Message {
  user?: string | null;
  message?: string | null;
}

const allMessages: Message[] = [];

async function conversation(url: string): Promise<Page> {
  const page = await login();

  await new Promise((r) => setTimeout(r, 3000));

  await page.goto(url);

  await new Promise((r) => setTimeout(r, 3000));

  while (true) {
    //scroll
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await new Promise((r) => setTimeout(r, 1000));

    await page.evaluate(() => {
      window.scrollBy(0, -window.innerHeight);
    });

    await new Promise((r) => setTimeout(r, 1000));

    // get all messages
    let messages = await page.$$eval(selector.messages, async (elements) => {
      return elements.map((element) => element.getAttribute("aria-label"));
    });

    if (messages.length > 0) {
      messages.forEach((text) => {
        let mod = text?.replace(",", "\u0000");
        let part = mod?.split("\u0000");
        if (part?.length == 2) {
          let [user, userMessage] = part;
          allMessages.push({ user: user, message: userMessage });
        }
      });
    } else {
      console.log("no messages here");
    }

    // waiting selectors
    await page.waitForSelector(selector.chat_label);
    await page.waitForSelector(selector.send_message);

    // reply the last message
    const lastMessage = allMessages.length - 1;
    const lastMessageUser = allMessages[lastMessage].user;
    const lastMessageContent = allMessages[lastMessage].message;

    console.log(allMessages);
    if (lastMessageUser && lastMessageContent && lastMessageUser != badooName) {
      console.log("generate reply...");
      let reply: string = "hum...";
      const chat = new ChatGpt(lastMessageUser);
      const replyGPT = await chat.chatCompletion(lastMessageContent);
      if (replyGPT !== null) reply = replyGPT;
      await page.click(selector.chat_label);
      await page.type(selector.chat_label, reply);
      await page.click(selector.send_message);
    }
    await new Promise((r) => setTimeout(r, 10000));
    await page.reload();
  }

  return page;
}

export default conversation;

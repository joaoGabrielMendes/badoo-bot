import { Page } from "puppeteer";
import login from "./login";
import { selector } from "./selectors/selectors";
import { Interface } from "readline";

interface Message {
  user?: string | null;
  message?: string | null;
}

const allMessages: Message[] = [];

interface GroupedMessage {
  user?: string | null;
  message?: string[] | null;
}

async function conversation(): Promise<Page> {
  const page = await login();

  await new Promise((r) => setTimeout(r, 3000));

  await page.goto(
    "https://badoo.com/pt/messages/zAhMACjE1Njk4NjUxMDgIZSundgAAAAAgQrwBcQANC9Aj8BU8HUyDOzteCncuDjQO583GLsDprrA"
  );

  await new Promise((r) => setTimeout(r, 3000));
  //get all messages
  const messages = await page.$$eval(selector.messages, (elements) => {
    return elements.map((element) => element.getAttribute("aria-label"));
  });

  if (messages.length > 0) {
    messages.forEach((text) => {
      let part = text?.split(",");
      if (part?.length == 2) {
        let [user, userMessage] = part;
        allMessages.push({ user: user, message: userMessage });
      }
    });
  } else {
    console.log("no messages here");
  }

  console.log(allMessages);

  return page;
}

export default conversation;

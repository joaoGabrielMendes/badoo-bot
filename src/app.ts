import { program } from "commander";
import Swipe from "./swipe";
import conversation from "./conversations";

program.version("1.0.0").description("Automation badoo website");

// Badoo automatic swap
program
  .command("swap")
  .description("infinite swap")
  .action(() => {
    Swipe();
  });

// Auto conversation passing chat`s url
program
  .command("auto-chat <url>")
  .description("auto conversation using chat gpt")
  .action((url: string) => {
    conversation(url);
  });

program.parse(process.argv);

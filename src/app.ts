import { program } from "commander";
import Swipe from "./swipe";
import conversation from "./conversations";

program.version("1.0.0").description("Automation badoo website");

program
  .command("swap")
  .description("infinite tinder swap")
  .action(() => {
    Swipe();
  });

program
  .command("server")
  .description("create a server")
  .action(() => {
    conversation();
  });

program.parse(process.argv);

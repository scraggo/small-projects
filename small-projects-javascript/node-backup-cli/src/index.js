import commander from "./commander";
import backup from "./backup";

const main = async () => backup(commander);

main();

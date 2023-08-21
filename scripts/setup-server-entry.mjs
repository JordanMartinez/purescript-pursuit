import process from "node:process";
import fs from "node:fs";

const output = process.env.NODE_ENV === "production" ? "output-es" : "output";
fs.writeFileSync("./pursuit-server-entry.js",
`#!/usr/bin/env node

import * as Main from "./${output}/Pursuit.Server.Main/index.js";

Main.main();`
);

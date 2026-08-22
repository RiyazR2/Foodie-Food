const path = require("path");
const { spawn } = require("child_process");

const children = [];
const parcelCli = path.join(__dirname, "node_modules", "parcel", "lib", "bin.js");

function start(command, args) {
  const child = spawn(command, args, {
    cwd: __dirname,
    stdio: "inherit",
  });

  children.push(child);
}

start(process.execPath, [path.join(__dirname, "server.js")]);
start(process.execPath, [parcelCli, "index.html"]);

function stopChildren() {
  children.forEach((child) => child.kill());
}

process.on("SIGINT", () => {
  stopChildren();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopChildren();
  process.exit(0);
});
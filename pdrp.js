const fs = require("fs");
const RPC = require("discord-rpc");
const clientId = "123456789012345678"; // <-- ВСТАВЬ СЮДА СВОЙ CLIENT_ID из Discord Developer Portal

let rpc = null;
let rpcActive = false;
const enableFile = "pleiade/enable_rpc.txt";

// Функция запуска RPC
function startRPC() {
  if (rpcActive) return;
  rpc = new RPC.Client({ transport: "ipc" });
  rpc.on("ready", () => {
    rpc.setActivity({
      details: "Играет с Pleiade",
      state: "Читерит в CS:GO",
      largeImageKey: "csgo", // Картинка должна быть загружена в Discord Developer Portal
      largeImageText: "Pleiade Beta",
      instance: false,
      startTimestamp: Date.now(),
    });
    console.log("Discord Rich Presence активирован!");
  });
  rpc.login({ clientId }).catch(console.error);
  rpcActive = true;
}

// Функция остановки RPC
function stopRPC() {
  if (!rpcActive) return;
  rpc.destroy();
  rpc = null;
  rpcActive = false;
  console.log("Discord Rich Presence выключен!");
}

// Следим за файлом-флагом
function watchFlag() {
  if (!fs.existsSync(enableFile)) {
    fs.writeFileSync(enableFile, "0");
  }
  let lastState = fs.readFileSync(enableFile, "utf8").trim();
  if (lastState === "1") startRPC();
  else stopRPC();

  fs.watchFile(enableFile, { interval: 500 }, () => {
    const state = fs.readFileSync(enableFile, "utf8").trim();
    if (state !== lastState) {
      lastState = state;
      if (state === "1") {
        startRPC();
      } else {
        stopRPC();
      }
    }
  });
}

watchFlag();

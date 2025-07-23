const RPC = require("discord-rpc");
const clientId = "1397633488940830852"; // <-- ВСТАВЬ СЮДА СВОЙ CLIENT_ID из Discord Developer Portal

RPC.register(clientId);

const rpc = new RPC.Client({ transport: "ipc" });

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
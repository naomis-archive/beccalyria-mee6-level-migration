import levelScale from "./config/LevelScale";
import { connectDatabase } from "./database/connectDatabase";
import LevelModel from "./database/models/LevelModel";
import { Leaderboard } from "./interfaces/Leaderboard";
import { logHandler } from "./utils/logHandler";

(async () => {
  const serverId = process.argv[2];
  const serverName = process.argv[3];

  if (!serverId) {
    throw new Error("No server ID provided!");
  }
  await connectDatabase();

  const leaderboard = [];
  let page = 0;

  let raw = await fetch(
    `https://mee6.xyz/api/plugins/levels/leaderboard/${serverId}?limit=1000&page=${page}`,
    {
      headers: {
        Authorization: process.env.MEE6_KEY || "",
      },
    }
  );
  let parsed = (await raw.json()) as Leaderboard;
  leaderboard.push(...parsed.players);
  page++;

  while (parsed.players.length >= 1000) {
    raw = await fetch(
      `https://mee6.xyz/api/plugins/levels/leaderboard/${serverId}?limit=1000&page=${page}`,
      {
        headers: {
          Authorization: process.env.MEE6_KEY || "",
        },
      }
    );
    parsed = (await raw.json()) as Leaderboard;
    leaderboard.push(...parsed.players);
    page++;
  }

  logHandler.log("info", `Got ${leaderboard.length} members!`);

  for (const user of leaderboard) {
    await LevelModel.create({
      serverID: serverId,
      serverName: serverName,
      userID: user.id,
      userTag: `${user.username}#${user.discriminator}`,
      avatar: "",
      points: user.level <= 100 ? levelScale[user.level] : 505000,
      level: user.level <= 100 ? user.level : 100,
      lastSeen: new Date(),
      cooldown: 0,
    });
  }

  logHandler.log("info", "Complete!");

  return;
})();

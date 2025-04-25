import { bot } from "@/helper/valibot";

export const serverUsagePostScheme = bot.object({
  machine: bot.pipe(bot.string(), bot.nonEmpty()),
  cpu: bot.number(),
  memory: bot.number(),
  disk: bot.number()
});
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addPoints } from "../utils/database";

export const dailyCommand = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Récompense journalière avec bonus"),

  async execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id;

    // Base de points et calcul du bonus
    const basePoints = 100;
    const totalPoints = basePoints;

    const newBalance = addPoints(userId, totalPoints);

    await interaction.reply(
      `🎉 ${interaction.user.username}, vous avez reçu ${totalPoints} points !\nVotre nouveau solde est de ${newBalance} points.`
    );
  },
};
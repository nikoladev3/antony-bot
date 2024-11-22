import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getPoints } from "../utils/database";

export const profileCommand = {
  data: new SlashCommandBuilder()
    .setName("profil")
    .setDescription("Afficher le profil d'un utilisateur.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Utilisateur à afficher")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("utilisateur") || interaction.user;
    const points = getPoints(user.id);

    await interaction.reply(
      `📊 Profil de ${user.username} :\n💰 Points : ${points}`
    );
  },
};

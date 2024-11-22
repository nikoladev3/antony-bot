import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addPoints } from "../utils/database";

export const addMoneyCommand = {
  data: new SlashCommandBuilder()
    .setName("add-money")
    .setDescription("Ajouter des points à un utilisateur.")
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription("Utilisateur à créditer")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("montant")
        .setDescription("Montant des points à ajouter")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("utilisateur", true);
    const amount = interaction.options.getInteger("montant", true);

    if (amount <= 0) {
      await interaction.reply("❌ Le montant doit être supérieur à 0.");
      return;
    }

    const newBalance = addPoints(user.id, amount);

    await interaction.reply(
      `✅ ${amount} points ont été ajoutés à ${user.username}.\nNouveau solde : ${newBalance} points.`
    );
  },
};

import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { config } from "dotenv";
import { dailyCommand } from "./commands/daily";
import { addMoneyCommand } from "./commands/addMoney";
import { profileCommand } from "./commands/profile";
import { initDatabase } from "./utils/database";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [dailyCommand, addMoneyCommand, profileCommand];

// Enregistrer les commandes auprès de Discord
client.once("ready", async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

  try {
    console.log("🔄 Enregistrement des commandes...");
    await rest.put(
      Routes.applicationCommands(client.user!.id),
      { body: commands.map((cmd) => cmd.data.toJSON()) }
    );
    console.log("✅ Commandes enregistrées avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement des commandes :", error);
  }

  await initDatabase();
  console.log(`✅ Base de données initialisée`);

  console.log(`✅ Bot connecté en tant que ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.find(
    (cmd) => cmd.data.name === interaction.commandName
  );
  if (command) {
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error("❌ Erreur lors de l'exécution de la commande :", error);
      await interaction.reply({
        content: "❌ Une erreur est survenue lors de l'exécution de la commande.",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

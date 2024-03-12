require("dotenv").config();
import { ApplicationCommand, Client, REST, Routes } from "discord.js";
import commandsData from "@commands";

export async function registerCommands(client: Client) {
	try {
		const token = process.env.DISCORD_BOT_TOKEN;
		const clientId = process.env.CLIENT_ID;
		if (!token) throw new Error("Discord bot token is missing.");
		const rest = new REST({ version: "9" }).setToken(token);

		console.log(`Started refreshing ${commandsData.length} application (/) commands.`);

		const commandData = commandsData.map((getData) => {
			const data = getData();
			return data.toJSON();
		});

		const data = await rest.put(
			Routes.applicationCommands(clientId ?? "missing id"),
			{ body: commandData },
		) as ApplicationCommand[];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.log(error)
	}
};

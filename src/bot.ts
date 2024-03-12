import 'module-alias/register'
require("dotenv").config();
import { Client, GatewayIntentBits, Interaction } from "discord.js";
import express from "express";
import { registerCommands } from '@utils/registerCommands';
import { handleInteractionError } from "@utils/handleError";
import { PingCommand, ScheduleCommand } from "@commands";

const commandsMap: { [key: string]: any } = {
	"ping": PingCommand,
	"jadwal": ScheduleCommand
}

class Bot {
	private client: Client
	private token: string

	constructor(client: Client, token: string) {
		this.client = client;
		this.token = token;
	}

	public listen(): void {
		this.client.on('interactionCreate', this.onInteractionCreate.bind(this))
		this.client.on('ready', this.onReady.bind(this))

		this.client.login(this.token)
	}

	private listenTo8080() {
		const app = express()
		app.get('/', (req, res) => {
			res.send('Ok')
		})
		app.listen(8080)
	}

	private onReady() {
		if (this.client.user) {
			console.log(`Online as ${this.client.user.tag}!`);
		}
		this.registerCommandsAfterReady();
		this.listenTo8080();
	}

	private registerCommandsAfterReady() {
		const interval = setInterval(() => {
			clearInterval(interval);
			registerCommands(this.client);
		}, 1000)
	}

	private async onInteractionCreate(interaction: Interaction) {
		try {
			if (interaction.isCommand()) {
				const commandName = interaction.commandName;
				const Command = this.getCommand(commandName);

				if (!Command) return;

				const CommandClass = new Command(interaction);
				await CommandClass.execute();
			} else if (interaction.isStringSelectMenu()) {
				const Command = this.getCommand('jadwal');

				if (!Command) return;

				const CommandClass = new Command(interaction);
				CommandClass.handleSelectMenuInteraction(interaction);
			}
		} catch (error) {
			handleInteractionError(error as Error, interaction);
		}
	}

	private getCommand(commandName: string) {
		return commandsMap[commandName];
	}
}

export default function initiateBot() {
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });
	const token = process.env.DISCORD_BOT_TOKEN;

	if (!token) throw new Error("Discord bot token is missing.");

	const bot = new Bot(client, token)
	bot.listen()
}

initiateBot()
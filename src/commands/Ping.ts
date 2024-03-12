import { BaseCommand } from "@baseCommands";
import { SlashCommandBuilder } from "discord.js";

export const getData = () => {
	const builder = new SlashCommandBuilder()
	builder
		.setName('ping')
		.setDescription('Replies with Pong!')
	return builder
}

export default class PingCommand extends BaseCommand {
	public execute(): void {
		this.send('Pong!')
	}
}
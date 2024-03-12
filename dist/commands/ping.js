"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const _baseCommands_1 = require("@baseCommands");
const discord_js_1 = require("discord.js");
const getData = () => {
    const builder = new discord_js_1.SlashCommandBuilder();
    builder
        .setName('ping')
        .setDescription('Replies with Pong!');
    return builder;
};
exports.getData = getData;
class PingCommand extends _baseCommands_1.BaseCommand {
    execute() {
        this.send('Pong!');
    }
}
exports.default = PingCommand;

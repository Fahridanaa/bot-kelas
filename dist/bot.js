"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("dotenv").config();
const discord_js_1 = require("discord.js");
const express_1 = __importDefault(require("express"));
const registerCommands_1 = require("@utils/registerCommands");
const handleError_1 = require("@utils/handleError");
const _commands_1 = require("@commands");
const commandsMap = {
    "ping": _commands_1.PingCommand,
    "jadwal": _commands_1.ScheduleCommand
};
class Bot {
    constructor(client, token) {
        this.client = client;
        this.token = token;
    }
    listen() {
        this.client.on('interactionCreate', this.onInteractionCreate.bind(this));
        this.client.on('ready', this.onReady.bind(this));
        this.client.login(this.token);
    }
    listenTo8080() {
        const app = (0, express_1.default)();
        app.get('/', (req, res) => {
            res.send('Ok');
        });
        app.listen(8080);
    }
    onReady() {
        if (this.client.user) {
            console.log(`Online as ${this.client.user.tag}!`);
        }
        this.registerCommandsAfterReady();
        this.listenTo8080();
    }
    registerCommandsAfterReady() {
        const interval = setInterval(() => {
            clearInterval(interval);
            (0, registerCommands_1.registerCommands)(this.client);
        }, 1000);
    }
    onInteractionCreate(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (interaction.isCommand()) {
                    const commandName = interaction.commandName;
                    const Command = this.getCommand(commandName);
                    if (!Command)
                        return;
                    const CommandClass = new Command(interaction);
                    yield CommandClass.execute();
                }
                else if (interaction.isStringSelectMenu()) {
                    const Command = this.getCommand('jadwal');
                    if (!Command)
                        return;
                    const CommandClass = new Command(interaction);
                    CommandClass.handleSelectMenuInteraction(interaction);
                }
            }
            catch (error) {
                (0, handleError_1.handleInteractionError)(error, interaction);
            }
        });
    }
    getCommand(commandName) {
        return commandsMap[commandName];
    }
}
function initiateBot() {
    const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
    const token = process.env.DISCORD_BOT_TOKEN;
    if (!token)
        throw new Error("Discord bot token is missing.");
    const bot = new Bot(client, token);
    bot.listen();
}
exports.default = initiateBot;
initiateBot();

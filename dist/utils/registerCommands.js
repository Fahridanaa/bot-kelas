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
exports.registerCommands = void 0;
require("dotenv").config();
const discord_js_1 = require("discord.js");
const _commands_1 = __importDefault(require("@commands"));
function registerCommands(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = process.env.DISCORD_BOT_TOKEN;
            const clientId = process.env.CLIENT_ID;
            if (!token)
                throw new Error("Discord bot token is missing.");
            const rest = new discord_js_1.REST({ version: "9" }).setToken(token);
            console.log(`Started refreshing ${_commands_1.default.length} application (/) commands.`);
            const commandData = _commands_1.default.map((getData) => {
                const data = getData();
                return data.toJSON();
            });
            const data = yield rest.put(discord_js_1.Routes.applicationCommands(clientId !== null && clientId !== void 0 ? clientId : "missing id"), { body: commandData });
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.registerCommands = registerCommands;
;

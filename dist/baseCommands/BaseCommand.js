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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const handleError_1 = require("@utils/handleError");
class BaseCommand {
    constructor(interaction) {
        this.interaction = interaction;
        this.commandWord = (interaction === null || interaction === void 0 ? void 0 : interaction.isCommand()) ? interaction.commandName : '';
    }
    send(content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const interaction = this.interaction;
                const messageContent = typeof content === 'string' ? { content } : content;
                const sentContent = yield interaction.reply(Object.assign(Object.assign({}, messageContent), { fetchReply: true, flags: discord_js_1.MessageFlags.Ephemeral }));
                return sentContent;
            }
            catch (error) {
                (0, handleError_1.handleInteractionError)(error, this.interaction);
            }
        });
    }
}
exports.default = BaseCommand;

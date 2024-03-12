"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const _baseCommands_1 = require("@baseCommands");
const discord_js_1 = require("discord.js");
const days = ["senin", "selasa", "rabu", "kamis", "jumat"];
const getData = () => {
    const builder = new discord_js_1.SlashCommandBuilder();
    builder
        .setName('jadwal')
        .setDescription('Melihat jadwal kuliah berdasarkan hari');
    return builder;
};
exports.getData = getData;
class ScheduleCommand extends _baseCommands_1.FinderCommand {
    execute() {
        const select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("schedule")
            .setPlaceholder("Pilih Hari")
            .addOptions(days.map(day => ({ label: day, value: day.toLowerCase() })));
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(select);
        this.send({ content: "Silahkan pilih hari untuk melihat jadwal", components: [row.toJSON()] });
    }
}
exports.default = ScheduleCommand;

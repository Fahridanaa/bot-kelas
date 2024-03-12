import { FinderCommand } from "@baseCommands";
import { ActionRowBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";

const days = ["senin", "selasa", "rabu", "kamis", "jumat"];

export const getData = () => {
    const builder = new SlashCommandBuilder()
    builder
        .setName('jadwal')
        .setDescription('Melihat jadwal kuliah berdasarkan hari')
    return builder
}

export default class ScheduleCommand extends FinderCommand {
    public execute(): void {
        const select = new StringSelectMenuBuilder()
            .setCustomId("schedule")
            .setPlaceholder("Pilih Hari")
            .addOptions(days.map(day => ({ label: day, value: day.toLowerCase() })))

        const row = new ActionRowBuilder()
            .addComponents(select);

        this.send({ content: "Silahkan pilih hari untuk melihat jadwal", components: [row.toJSON()] as any });
    }
}
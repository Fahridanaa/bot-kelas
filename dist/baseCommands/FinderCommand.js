"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _baseCommands_1 = require("@baseCommands");
const schedules_1 = __importDefault(require("../data/schedules"));
const times_json_1 = __importDefault(require("../data/times.json"));
class FinderCommand extends _baseCommands_1.BaseCommand {
    returnNotFound() {
        this.send('Not found');
    }
    getScheduleByDay(day) {
        var _a;
        return (_a = schedules_1.default[day.toLowerCase()]) !== null && _a !== void 0 ? _a : this.returnNotFound();
    }
    handleSelectMenuInteraction(interaction) {
        if (interaction.customId !== 'schedule')
            return;
        const day = interaction.values[0];
        const schedule = this.getScheduleByDay(day);
        if (!schedule)
            return;
        let messageContent = `Jadwal hari ${day}:\n\n`;
        let i = 1;
        for (const classInfo of schedule) {
            messageContent += `[${i++}]\n`;
            const classDetails = this.getClassDetails(classInfo);
            messageContent += classDetails + '\n';
        }
        this.send({ content: messageContent });
    }
    getClassDetails(classInfo) {
        let classDetails = '';
        for (const key in classInfo) {
            if (key === 'mulai' || key === 'selesai') {
                const timeSlot = classInfo[key];
                const timeKey = timeSlot;
                const time = times_json_1.default[timeKey];
                if (key === 'mulai')
                    classDetails += `Jam: ${time.start} `;
                if (key === 'selesai')
                    classDetails += `- ${time.end}\n`;
            }
            else {
                classDetails += `${key}: ${String(classInfo[key])}\n`;
            }
        }
        return classDetails;
    }
}
exports.default = FinderCommand;

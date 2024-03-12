import { BaseCommand } from '@baseCommands'
import schedules from '../data/schedules'
import times from '../data/times.json'
import { StringSelectMenuInteraction } from 'discord.js';

export default class FinderCommand extends BaseCommand {
    protected returnNotFound() {
        this.send('Not found');
    }

    protected getScheduleByDay(day: string) {
        return schedules[day.toLowerCase() as keyof typeof schedules] ?? this.returnNotFound();
    }

    public handleSelectMenuInteraction(interaction: StringSelectMenuInteraction): void {
        if (interaction.customId !== 'schedule') return;

        const day = interaction.values[0];
        const schedule = this.getScheduleByDay(day);
        if (!schedule) return;

        let messageContent = `Jadwal hari ${day}:\n\n`;
        let i = 1;
        for (const classInfo of schedule) {
            messageContent += `[${i++}]\n`
            const classDetails = this.getClassDetails(classInfo);
            messageContent += classDetails + '\n';
        }
        this.send({ content: messageContent });
    }

    private getClassDetails(classInfo: any): string {
        let classDetails = '';
        for (const key in classInfo) {
            if (key === 'mulai' || key === 'selesai') {
                const timeSlot = (classInfo as { [key: string]: string })[key];
                const timeKey = timeSlot as keyof typeof times;
                const time = times[timeKey];
                if (key === 'mulai') classDetails += `Jam: ${time.start} `;
                if (key === 'selesai') classDetails += `- ${time.end}\n`;
            } else {
                classDetails += `${key}: ${String(classInfo[key])}\n`;
            }
        }
        return classDetails;
    }
}
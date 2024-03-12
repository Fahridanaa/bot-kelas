import { CommandInteraction, Interaction, Message, MessageFlags, MessageReplyOptions } from "discord.js";
import { handleInteractionError } from "@utils/handleError";

export default abstract class BaseCommand {
    protected interaction: Interaction;
    protected commandWord: string

    constructor(interaction: Interaction) {
        this.interaction = interaction;
        this.commandWord = interaction?.isCommand() ? interaction.commandName : ''
    }

    protected async send(content: MessageReplyOptions | string): Promise<Message | undefined> {
        try {
            const interaction = this.interaction as CommandInteraction
            const messageContent = typeof content === 'string' ? { content } : content

            const sentContent = await interaction.reply({ ...messageContent, fetchReply: true, flags: MessageFlags.Ephemeral });
            return sentContent
        } catch (error) {
            handleInteractionError(error as Error, this.interaction)
        }
    }
}
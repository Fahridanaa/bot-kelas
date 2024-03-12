"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInteractionError = void 0;
/**
 * Handles error on interaction sending.
 *
 * @param {Error} error
 * @param {object} message
 */
function handleInteractionError(error, interaction) {
    const authorName = interaction.user.username;
    const authorTag = interaction.user.tag;
    const errorText = error.toString() || '';
    console.log(`${error.name}: ${interaction.isCommand() && interaction.commandName} by ${authorName}(${authorTag})`);
    if (errorText.includes('TypeError') || errorText.includes('RangeError')) {
        console.log(error);
    }
}
exports.handleInteractionError = handleInteractionError;

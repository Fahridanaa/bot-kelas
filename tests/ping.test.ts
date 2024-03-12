import pingCommand, { getData } from '../src/commands/Ping';
import { executeCommandAndSpyReply, getParsedCommand } from './testutils';

describe('Ping Command', () => {
  it('should reply with "Pong!"', async () => {
    const commandData = getData();
    const stringCommand = '/ping';

    const command = getParsedCommand(stringCommand, commandData);
    const spy = executeCommandAndSpyReply(pingCommand, command);

    expect(spy).toHaveBeenCalledWith('Pong!');
  });
});

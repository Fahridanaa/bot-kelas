import {
	Client,
	User,
	CommandInteraction,
	SlashCommandBuilder,
  } from "discord.js";
  
  export default class MockDiscord {
	private client!: Client;
	private user!: User;
	public interaction!: CommandInteraction;
  
	constructor(options) {
	  this.mockClient();
	  this.mockUser();
	  this.mockInteraction(options?.command)
	}
  
	public getInteraction(): CommandInteraction {
	  return this.interaction;
	}
  
	private mockClient(): void {
	  this.client = new Client({ intents: [] });
	  this.client.login = jest.fn(() => Promise.resolve("LOGIN_TOKEN"));
	}
  
	private mockUser(): void {
	  this.user = Reflect.construct(User, [
		  this.client, {
			id: "user-id",
			username: "USERNAME",
			discriminator: "user#0000",
			avatar: "user avatar url",
			bot: false,
		  }
		]
	  )
	}
  
	private mockInteraction(command : SlashCommandBuilder): void {
	  this.interaction = Reflect.construct(CommandInteraction, [
		this.client,
		  {
			data: command,
			id: BigInt(1),
			user: this.user,
		  }
		]
	  )
	  this.interaction.reply = jest.fn()
	  this.interaction.isCommand = jest.fn(() => true)
	}
  }
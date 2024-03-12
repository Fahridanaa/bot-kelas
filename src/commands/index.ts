import PingCommand, { getData as getPingData } from "./Ping";
import ScheduleCommand, {getData as getScheduleData} from "./Schedule";

export {
	PingCommand,
	ScheduleCommand
}

export default [
	getPingData,
	getScheduleData
] as const;
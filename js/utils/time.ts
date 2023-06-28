const enum Time {
	MINUTES_IN_HOUR = 60,
	MS_IN_MINUTE = 60_000
}
export type TimeString = `${number}:${number}`;

const timeStringToNumber = (time: TimeString): number => {
	const [hours, minutes] = time.split(':').map(Number);
	return hours * Time.MINUTES_IN_HOUR + minutes;
};

const isOnWorkHours = (startWork: TimeString, endWork: TimeString, startMeet: TimeString, duration: number) => {
	const [startAsNumber, endAsNumber, startMeetAsNumber] = [startWork, endWork, startMeet].map(timeStringToNumber);
	const endMeetAsNumber = startMeetAsNumber + duration;

	return startAsNumber <= startMeetAsNumber && endMeetAsNumber <= endAsNumber;
};


const getTimestamp = (time: TimeString, date: Date) => {
	const [hours, minutes] = time.split(':').map(Number);
	date.setHours(hours, minutes);
	return date.getTime();
};

const isOnWorkHoursDate = (startWork: TimeString, endWork: TimeString, startMeet: TimeString, duration: number) => {
	const currentDate = new Date();
	const [dayBeginTimestamp, dayEndTimestamp, meetBeginTimestamp] = [startWork, endWork, startMeet].map((time) => getTimestamp(time, currentDate));
	const meetEndTimestamp = meetBeginTimestamp + (duration * Time.MS_IN_MINUTE);

	return meetBeginTimestamp >= dayBeginTimestamp && meetEndTimestamp <= dayEndTimestamp;
};

export { isOnWorkHours, isOnWorkHoursDate };

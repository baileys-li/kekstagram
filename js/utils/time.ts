const enum Time {
	MINUTES_IN_HOUR = 60
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

export { isOnWorkHours };

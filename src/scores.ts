import { Schedule } from "./schedule";
import { Day, Time, parseTime, numberToTime } from "./mydaytime";
let days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MODIFIER_VALUE = 0.95

export abstract class compactScore {
    /**
     * Returns the compactScore which is based on how close the startTime is to the endTime
     * overall. It also takes into account how many active days the schedule has, less active days\
     * means more compact.
     * 
     * @param schedule Schedule from which the score is calculated
     * @returns compactScore (from 0 to 1 inclusive)
     */
    static getScore(schedule: Schedule): string {
        let score = 1;
        for (let daySession of schedule.allDaySessions) {
            let startTime = parseTime(daySession.startTime);
            let endTime = parseTime(daySession.endTime);
            let timeDiff = endTime - startTime;
            score -= timeDiff / 7 / 1440;
        }

        let activeDays = schedule.activeDays;
        let activeDaysModifier = MODIFIER_VALUE + (1 - MODIFIER_VALUE) * (activeDays / 6);
        score = score / activeDaysModifier;
        score = Math.round((score * 100 + Number.EPSILON) * 1000) / 1000
        return score + "%";
    }
}
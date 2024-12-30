import {monthNames} from '../constants/appInfos';
import {format} from 'date-fns';

export class HandleDateTime {
  static DateString = (num: number) => {
    const date = new Date(num);
    return `${date.getDate()}/${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  static GetHour = (num: number) => {
    const date = new Date(num);
    return `${date.getHours()}`;
  };

  static formatTimestampToAMPM = (timestamp: any) => {
    const date = new Date(
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6),
    );
    return format(date, 'hh:mm a');
  };

  static formatTimestampToMonthDay = (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6));
    return format(date, 'MMMM dd');
  };
}

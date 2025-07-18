import dayjs from 'dayjs';

import 'dayjs/locale/vi';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('vi');

export const localeDayjs = dayjs;

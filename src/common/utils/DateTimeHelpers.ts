export function convert_to_IST(time: Date) {
  return time.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

export function convert_to_UTC(time) {
  return time.toLocaleString('en-US', { timeZone: 'UTC' });
}

export function getDate(date_time) {
  const local_date = new Date(exports.convert_to_IST(date_time));
  const minIntDigits = 2;
  const updated_date = formatNumber(local_date.getDate(), minIntDigits);
  const month = formatNumber(local_date.getMonth() + 1, minIntDigits);
  return `${updated_date}-${month}-${local_date.getFullYear()}`;
}

export function getTime(date_time) {
  const local_date = new Date(exports.convert_to_IST(date_time));
  const minIntDigits = 2;
  const hour = formatNumber(local_date.getHours(), minIntDigits);
  const minute = formatNumber(local_date.getMinutes(), minIntDigits);
  const seconds = formatNumber(local_date.getSeconds(), minIntDigits);
  return `${hour}:${minute}:${seconds}`;
}

function formatNumber(data, minIntDigits) {
  return data.toLocaleString('en-US', {
    minimumIntegerDigits: minIntDigits,
    useGrouping: false,
  });
}

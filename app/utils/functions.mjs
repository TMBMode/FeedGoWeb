export const randint = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sleep = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
);

export const tribool = (text) => {
  if (text.toLowerCase().includes('n')) return 0;
  if (text.toLowerCase().includes('y')) return 1;
  return -1;
}

const uidChars = '0123456789ACEFGHJKLMNPQRTVWXYZ';
export const generateUid = (len=6) => {
  let res = '';
  for (let i = 0; i < len; i++) {
    res += uidChars[randint(0, uidChars.length-1)];
  }
  console.log(res);
  return res;
}

export const sumPageNum = (a, b) => {
  let r = '';
  [a, b] = [`${a}`, `${b}`];
  if (a.length !== b.length) return `${a}-${b}`;
  for (let i in a) {
    i = parseInt(i);
    if (a[i] === b[i]) r += a[i];
    else return `${r}${a.slice(-a.length+i)}-${b.slice(-b.length+i)}`;
  } return a;
}

export const getTime = () => {
  const date = new Date();
  const
    year = date.getFullYear() % 100,
    month = String(date.getMonth() + 1).padStart(2, '0'),
    day = String(date.getDate()).padStart(2, '0'),
    hours = String(date.getHours()).padStart(2, '0'),
    minutes = String(date.getMinutes()).padStart(2, '0'),
    seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}/${hours}:${minutes}:${seconds}`;
}

export const dateToString = (stamp) => {
  let date = new Date(stamp);
  let year = date.getFullYear(),
      month = String(date.getMonth() + 1).padStart(2, '0'),
      day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
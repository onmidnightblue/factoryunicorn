export const checkedPhone = (string) => {
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  if (regex.test(string)) {
    return string;
  }
  return false;
};

export const checkedTrim = (string) => {
  if (string.trim().length !== 0) {
    return string;
  }
  return false;
};

export const checkedSize = (string) => {
  const regex = /^([0-9]{2})x?([0-9]{2})$/;
  if (regex.test(string)) {
    return string;
  }
  return false;
};

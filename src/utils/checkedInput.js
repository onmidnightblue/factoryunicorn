export const checkedPhone = (string) => {
  const regex = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
  if (regex.test(string)) {
    return true;
  }
};

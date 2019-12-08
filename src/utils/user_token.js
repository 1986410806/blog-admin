/**
 * @returns {*}
 */
export function getUserToken() {
  const authorityString = localStorage.getItem('user-token');

  let authority = {};

  if (authorityString) {
    authority = JSON.parse(authorityString);
  }

  return authority;
}

/**
 *
 * @param user
 */
export function setUserToken(user) {
  localStorage.setItem('user-token', JSON.stringify(user)); // auto reload
}

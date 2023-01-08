export const getEmailParam = () =>
  // eslint-disable-next-line no-restricted-globals
  new URL(location.href).searchParams.get('email');

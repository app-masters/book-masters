export default function preprocessEmail(email) {
  // eslint-disable-next-line
  const testRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
  return testRegex.test(email);
}

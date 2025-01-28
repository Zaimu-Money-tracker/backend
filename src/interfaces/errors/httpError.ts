export default interface HttpError extends Error {
  statusCode: number;
}

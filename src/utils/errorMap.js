const errorMap = {
  MISSING_ARGUMENTS: 400,
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  SALE_NOT_FOUND: 404,
  TRAVEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
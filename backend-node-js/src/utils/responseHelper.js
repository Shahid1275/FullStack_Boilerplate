// Response helper functions

export const successResponse = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

export const errorResponse = (res, statusCode, message = 'Error') => {
  res.status(statusCode).json({
    success: false,
    message,
  })
}

export const paginatedResponse = (res, data, page, limit, total) => {
  res.status(200).json({
    success: true,
    count: data.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    data,
  })
}

export default {
  successResponse,
  errorResponse,
  paginatedResponse,
}

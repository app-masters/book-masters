import e from 'express';

export default (error, _req, res, _next) => {
  if (error.code === 'E_VALIDATION_FAILED') {
    return res
      .status(error.status)
      .send({ status: error.status, code: error.code, error: { fields: error.fields, message: error.message } });
  } else {
    if (error.status) {
      return res
        .status(error.status)
        .send({ status: error.status, success: false, error: { message: error.error.message } });
    } else {
      return res.status(500).send({ status: 500, success: false, message: 'Ocorreu um erro interno no servidor.' });
    }
  }
};

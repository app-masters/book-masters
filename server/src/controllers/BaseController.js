class BaseController {
  returnSuccess(response, message) {
    if (message) {
      return response.status(200).send({ status: 200, success: true, message: message });
    } else {
      return response.status(200).send();
    }
  }

  returnGenericException(response, error) {
    if (error.status) {
      return response.status(error).send({ status: error.status, success: false, message: error.message });
    } else {
      return response
        .status(500)
        .send({ status: 500, success: false, message: 'Ocorreu um erro interno no servidor.' });
    }
  }
}

export default BaseController;

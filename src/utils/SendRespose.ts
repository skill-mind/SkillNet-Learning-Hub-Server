import { Response } from 'express';

class SendResponse {
  public SucessResponse(
    res: Response,
    StatusCode: number,
    data: any,
    message: string,
  ) {
    res.status(StatusCode).json({
      status: StatusCode,
      message: message,
      data: data,
    });
  }
  public ErrorResponse(
    res: Response,
    StatusCode: number,
    data: any,
    message: string,
  ) {
    res.status(StatusCode).json({
      status: StatusCode,
      message: message,
      data: data,
      error: true,
    });
  }
}

export default new SendResponse();

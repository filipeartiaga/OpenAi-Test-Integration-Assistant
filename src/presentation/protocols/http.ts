export interface HttpRequest {
  headers: any
  body: any
  params: any
}

export interface HttpResponse {
  statusCode: number
  body: any
  headers?: any
}
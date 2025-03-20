export interface UrlTypes {
  _id: string;
  fullUrl: string;
  clicks: number;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DeletedUrlTypes {
  message: string;
}

export interface DbRequest {
  match: any;
  sort?: { [key: string]: number };
  limit?: number;
}

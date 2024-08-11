export interface PaginationInput {
  page?: number;
  size?: number;
}

export interface PaginationDataInput<T> {
  rows: T[];
  total: number;
  limit: number;
  page?: number;
}

export interface PaginationDataOutput<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}

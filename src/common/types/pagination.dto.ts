export interface PaginationMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationDto<T> {
  items: T[];
  meta: PaginationMetaData;
}

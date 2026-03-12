export type ApiResponse<T> = {
  success: boolean;
  time: string;
  message: string;
  data: T;
  error: unknown;
};

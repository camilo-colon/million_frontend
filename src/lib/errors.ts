/**
 * Error personalizado para errores de API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Error para cuando no se encuentra un recurso
 */
export class NotFoundError extends Error {
  constructor(message: string = "Recurso no encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Error para validación de datos
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Error de red/conexión
 */
export class NetworkError extends Error {
  constructor(message: string = "Error de conexión") {
    super(message);
    this.name = "NetworkError";
  }
}

/**
 * Manejo centralizado de errores
 */
export function handleError(error: unknown): Error {
  // Si ya es un error conocido, retornarlo
  if (error instanceof Error) {
    return error;
  }

  // Si es un objeto con mensaje
  if (typeof error === "object" && error !== null && "message" in error) {
    return new Error(String(error.message));
  }

  // Error desconocido
  return new Error("Error desconocido");
}

/**
 * Formatea un error para mostrar al usuario
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return `Error de API: ${error.message}`;
  }

  if (error instanceof NetworkError) {
    return "No se pudo conectar con el servidor. Verifica tu conexión.";
  }

  if (error instanceof NotFoundError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return `Error de validación: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ha ocurrido un error inesperado";
}

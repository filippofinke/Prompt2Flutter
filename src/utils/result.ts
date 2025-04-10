export type Result<T, E> = Ok<T> | Err<E>;

export type Ok<T> = {
  ok: true;
  data?: T;
};

export type Err<E> = {
  ok: false;
  error: E;
};

export function ok<T>(data?: T): Ok<T> {
  return { ok: true, data };
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok;
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return !result.ok;
}

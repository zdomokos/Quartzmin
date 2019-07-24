import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export interface CommonData {
  state: string;
  loading: boolean;
  failed: boolean;
}

export interface LoadingData extends CommonData {
  state: 'loading';
  loading: true;
  failed: false;
}

export interface CompleteData<T> extends CommonData {
  state: 'complete';
  loading: false;
  failed: false;
  data: T;
}

export interface ErrorData<E> extends CommonData {
  state: 'error';
  loading: false;
  failed: true;
  error: E;
}

export type AsyncData<T, E = string> = LoadingData | CompleteData<T> | ErrorData<E>;

export const LoadingState: LoadingData = Object.freeze({ state: 'loading', loading: true, failed: false, data: null }) as any;

function wrapData<T>(data: T): CompleteData<T> {
  return {
    state: 'complete',
    loading: false,
    failed: false,
    data
  };
}

function wrapError<E>(error: E): ErrorData<E> {
  return {
    state: 'error',
    loading: false,
    failed: true,
    error
  };
}

export function getAsyncData<T, E = string>(observable: Observable<T>): Observable<AsyncData<T, E>> {
  return observable.pipe(
    map(data => wrapData(data)),
    catchError(error => of(wrapError(error))),
    startWith(LoadingState)
  );
}

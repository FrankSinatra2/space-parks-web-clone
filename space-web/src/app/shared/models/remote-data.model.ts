
export type NotAsked = {
    readonly type: 'not-asked';
};

export type Loading = {
    readonly type: 'loading';
};

export type Success<T> = {
    readonly type: 'success';
    readonly value: T;
};

export type Failure<T> = {
    readonly type: 'failure';
    readonly value: T;
};

export type RemoteData<A, B>
    = NotAsked
    | Loading
    | Success<A>
    | Failure<B>;

export const isNotAsked = <A, B>(data: RemoteData<A, B>): data is NotAsked => data.type === 'not-asked';
export const isLoading = <A, B>(data: RemoteData<A, B>): data is Loading => data.type === 'loading';
export const isSuccess = <A, B>(data: RemoteData<A, B>): data is Success<A> => data.type === 'success';
export const isFailure = <A, B>(data: RemoteData<A, B>): data is Failure<B> => data.type === 'failure';

export const notAsked = (): NotAsked => ({ type: 'not-asked' });
export const loading = (): Loading => ({ type: 'loading' });
export const success = <T>(data: T): Success<T> => ({ type: 'success', value: data });
export const failure = <T>(data: T): Failure<T> => ({ type: 'failure', value: data });

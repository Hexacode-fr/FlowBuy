import { from, type Accessor } from "solid-js"
import { liveQuery } from "dexie"

export function useLiveQuery<T>(querier: () => T | Promise<T>): Accessor<T | undefined> {
    return from(liveQuery(querier))
}
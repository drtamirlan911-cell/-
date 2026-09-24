type Listener=(payload:unknown)=>void
const listeners=new Map<string,Set<Listener>>()
export function subscribe(token:string,listener:Listener){let set=listeners.get(token);if(!set){set=new Set();listeners.set(token,set)}set.add(listener);return()=>{set!.delete(listener);if(!set!.size)listeners.delete(token)}}
export function publish(token:string,payload:unknown){listeners.get(token)?.forEach(fn=>fn(payload))}

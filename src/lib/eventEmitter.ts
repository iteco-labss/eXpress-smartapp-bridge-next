import EventEmitter from 'eventemitter3'

import type { EmitterEventPayload, EmitterEventType } from '../types/eventEmitter'

/**
 * Extended Event Emitted class
 *
 * ```typescript
 * const emitter = new EmitterEventPayload()
 *
 * // promise will be rejected in 20 secs
 * // if no one event has been received with type 'ref-uuid-value'
 * // otherwise promise will be fulfilled with payload object
 * const promise = emitter.onceWithTimeout('ref-uuid-value', 20000)
 * ```
 */
class ExtendedEventEmitter extends EventEmitter {
  constructor() {
    super()
  }

  /**
   * Wait when event with `type` will be emitted for `timeout` ms.
   *
   * ```js
   * emitter.onceWithTimeout('d6910a9d-ea24-5fc6-a654-28781ef21f8f', 20000)
   * // => Promise
   * ```
   * @param type - Event type, uuid or EVENT_TYPE.RECV for standalone events from client
   * @param timeout - Timeout in ms
   * @returns Promise.
   */
  onceWithTimeout(type: EmitterEventType, timeout: number): Promise<EmitterEventPayload> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        console.error('Bridge ~ Timeout event', timer)
        reject(new Error('Bridge ~ Timeout event'))
      }, timeout)

      this.once(type, (event: EmitterEventPayload) => {
        clearTimeout(timer)
        resolve(event)
      })
    })
  }
}

export default ExtendedEventEmitter

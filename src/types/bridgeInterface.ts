import type { HANDLER } from '../lib/constants'

import type { EmitterEventPayload, EventEmitterCallback } from './eventEmitter'

export interface BridgeSendClientEventParams {
  readonly method: string
  readonly params: object | undefined
  readonly timeout?: number
}

export type BridgeSendBotEventParams = BridgeSendClientEventParams & {
  readonly files?: any
  readonly guaranteed_delivery_required?: boolean | undefined
}

export type BridgeSendEventParams = BridgeSendClientEventParams &
BridgeSendBotEventParams & {
  readonly handler: HANDLER
}

export interface Bridge {
  readonly onReceive: (callback: EventEmitterCallback) => void
  readonly sendBotEvent: (event: BridgeSendBotEventParams) => Promise<EmitterEventPayload>
  readonly sendClientEvent: (event: BridgeSendClientEventParams) => Promise<EmitterEventPayload>
  readonly disableRenameParams: () => void
  readonly enableRenameParams: () => void
}

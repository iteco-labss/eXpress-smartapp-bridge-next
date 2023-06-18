import { PLATFORM } from './constants'

const getPlatformByGetParam = (): PLATFORM => {
  const platform = new URLSearchParams(location.search).get('platform')

  const isValidPlatform = Object.values(PLATFORM).includes(<PLATFORM>platform)
  if (isValidPlatform) {
    return <PLATFORM>platform
  }

  return PLATFORM.UNKNOWN
}

const detectPlatformByUserAgent = (): PLATFORM => {
  if (/android/i.test(navigator.userAgent)) {
    return PLATFORM.ANDROID
  }

  if (
    (/iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.userAgent.includes('Mac') && 'ontouchend' in document))
    && !(window as any).MSStream
  ) { return PLATFORM.IOS }

  return PLATFORM.WEB
}

/**
 * Get platform. Detection based on GET param `platform` or user agent.
 *
 * ```typescript
 * const platform = getPlatform()
 * // => 'web' | 'ios' | 'android'
 * ```
 * @returns 'web' | 'ios' | 'android'
 */
const getPlatform = (): PLATFORM => {
  return getPlatformByGetParam() || detectPlatformByUserAgent()
}

export default getPlatform

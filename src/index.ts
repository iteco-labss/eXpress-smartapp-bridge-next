import { PLATFORM } from './lib/constants'
import getPlatform from './lib/platformDetector'
import AndroidBridge from './lib/platforms/android'
import IosBridge from './lib/platforms/ios'
import WebBridge from './lib/platforms/web'
import type { Bridge } from './types/bridgeInterface'
import { LIB_VERSION } from './version'

const getBridge = (): Bridge | null => {
  if (!import.meta.env.PROD) {
    return null
  }

  const platform = getPlatform()
  console.log('Bridge ~ version', LIB_VERSION)

  switch (platform) {
    case PLATFORM.ANDROID:
      return new AndroidBridge()
    case PLATFORM.IOS:
      return new IosBridge()
    case PLATFORM.WEB:
      return new WebBridge()
    default:
      console.error('Bridge ~ Wrong platform')
      break
  }

  return null
}

export default getBridge()

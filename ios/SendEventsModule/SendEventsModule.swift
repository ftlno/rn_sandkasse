import Foundation
import React

@objc(SendEventsModule)
class SendEventsModule: RCTEventEmitter {
  
  override func supportedEvents() -> [String]! {
    return ["toNative","fromNative"]
  }
  
  @objc override static func moduleName() -> String {
    return "SendEventsModule"
  }
  
  @objc(fromNative:)
  func fromNative(_ data: String) {
    print("📡 Sending data to JS: \(data)")
    sendEvent(withName: "fromNative", body: "Fra native: \(data)")
  }
  
  @objc(toNative:)
  func toNative(_ data: String) {
    print("📡 Receiving data from JS: \(data)")
    fromNative(data)
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

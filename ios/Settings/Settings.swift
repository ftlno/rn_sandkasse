import Foundation
import React

@objc(Settings)
class Settings: NSObject, RCTBridgeModule {
  static func moduleName() -> String {
    return "Settings"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  
  @objc func get(_ key: String, callback: @escaping RCTResponseSenderBlock) {
    let defaults = UserDefaults.standard
    
    if let value = defaults.string(forKey: key) {
      if let secureValue = Secure().get(key: key) {
        print("returning slower/secure value")
        return callback([NSNull(), secureValue])
      }
      print("returning faster/less secure value")
      return callback([NSNull(), value])
    }
    print("no value found")
    return callback([NSNull(), ""])
  }
  
  @objc func set(_ key: String, value: String, callback: @escaping RCTResponseSenderBlock) {
    let defaults = UserDefaults.standard
    
    defaults.set(value, forKey: key)
    Secure().set(key: key, value: value)
    
    return callback([NSNull(), "\(key) saved"])
  }
}

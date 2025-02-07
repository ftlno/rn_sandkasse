#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Settings, NSObject)

RCT_EXTERN_METHOD(get:(NSString *)key callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(set:(NSString *)key value:(NSString *)value callback:(RCTResponseSenderBlock)callback)

@end

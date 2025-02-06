#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SendEventsModule, RCTEventEmitter)
RCT_EXTERN_METHOD(toNative:(NSString *)data)
RCT_EXTERN_METHOD(fromNative:(NSString *)data)
@end

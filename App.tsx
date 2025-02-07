import React, {useEffect} from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {subscribeToNativeEvent, sendEventsToNative} from './SendEventsModule';
import {set, get} from './Settings';

function App(): React.JSX.Element {
  const [nativeEventData, setNativeEventData] = React.useState('');
  const [secureValue, setSecureValue] = React.useState('');
  const [randomString, setRandomString] = React.useState(
    Math.random().toString(36).substring(2, 6).toUpperCase(),
  );

  useEffect(() => {
    const unsubscribe = subscribeToNativeEvent((data: any) => {
      console.log('Received event from native:', data);
      setNativeEventData(data);
    });

    return unsubscribe;
  }, []);

  const sendToNative = async () => {
    set(randomString);
    sendEventsToNative(randomString);
    const value = await get();
    setSecureValue(value);
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.sectionTitle}>Send events</Text>
          <Text style={styles.sectionDescription}>
            Klikk på knappen for å sende{' '}
            <Text style={styles.highlight}>{randomString}</Text> til native
          </Text>

          <View style={styles.actionsContainer}>
            <Button
              onPress={sendToNative}
              title="Send event til Native"
              color="#841584"
            />
            <Button
              onPress={() => {
                setRandomString(
                  Math.random().toString(36).substring(2, 6).toUpperCase(),
                );
              }}
              title="Lag ny random"
              color="#841584"
            />
          </View>
          {nativeEventData && (
            <Text style={[styles.sectionDescription, styles.highlight]}>
              {nativeEventData}
            </Text>
          )}
          {secureValue && (
            <Text style={[styles.sectionDescription, styles.highlight]}>
              From secure Storage: {secureValue}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 10,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

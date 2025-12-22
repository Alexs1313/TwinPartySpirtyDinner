import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';

const TwinPartySpirtyDinnerRules = () => {
  return (
    <TwinPartySpirtyDinnerBackground>
      <ScrollView
        contentContainerStyle={styles.containerTwinPartySpirtyDinner}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titleTwinPartySpirtyDinner}>
          GAME RULES / ROUNDS
        </Text>

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTitleTwinPartySpirtyDinner}>Game rules</Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            Twin Party is an offline game for the company. Your phone is your
            host.
            {'\n\n'}
            Gather your friends, put your phone on the table and follow the
            simple rules.
          </Text>
        </View>

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTitleTwinPartySpirtyDinner}>Rounds</Text>

          <Text style={styles.subTitleTwinPartySpirtyDinner}>QUESTION</Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            • A question appears on the screen{'\n'}• There are no right or
            wrong answers in the game{'\n'}• Answer one by one or all at once
            {'\n'}• The main thing is the conversation, not the result
          </Text>

          <View style={styles.spacerTwinPartySpirtyDinner} />

          <Text style={styles.subTitleTwinPartySpirtyDinner}>ACTION</Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            Action appears on the screen{'\n'}
            One player or the entire company performs a task{'\n'}
            Nothing is recorded or filmed{'\n'}
            Just perform the action and move on
          </Text>
        </View>

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTitleTwinPartySpirtyDinner}>
            How the game goes
          </Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            Twin Party is an offline game for the company. Your phone is your
            host.
            {'\n\n'}
            Gather your friends, put your phone on the table and follow the
            simple rules.
          </Text>
        </View>

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTitleTwinPartySpirtyDinner}>Party Mode</Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            QUESTION and ACTION alternate automatically{'\n'}
            Fast pace{'\n'}
            Minimal pauses
          </Text>
        </View>

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTitleTwinPartySpirtyDinner}>Chill Mode</Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            Mostly QUESTION{'\n'}
            Slow pace{'\n'}
            More time for conversation
          </Text>
        </View>

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTitleTwinPartySpirtyDinner}>
            Important to know
          </Text>
          <Text style={styles.textTwinPartySpirtyDinner}>
            The game works offline{'\n'}
            No accounts{'\n'}
            No scores or winners{'\n'}
            No one loses
          </Text>
        </View>

        <View style={styles.bottomSpacerTwinPartySpirtyDinner} />
      </ScrollView>
    </TwinPartySpirtyDinnerBackground>
  );
};

const styles = StyleSheet.create({
  containerTwinPartySpirtyDinner: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  titleTwinPartySpirtyDinner: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },
  cardTwinPartySpirtyDinner: {
    backgroundColor: '#23113C',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  cardTitleTwinPartySpirtyDinner: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subTitleTwinPartySpirtyDinner: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  textTwinPartySpirtyDinner: {
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  spacerTwinPartySpirtyDinner: {
    height: 16,
  },
  bottomSpacerTwinPartySpirtyDinner: {
    height: 120,
  },
});

export default TwinPartySpirtyDinnerRules;

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Background from '../[components]/Background';

const TwinPartySpirtyDinnerRules = () => {
  return (
    <Background>
      <ScrollView
        contentContainerStyle={sty.ruleContainer}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Rules scroll"
      >
        <Text style={sty.pageTitle} accessibilityRole="header">
          GAME RULES / ROUNDS
        </Text>

        <View style={sty.panel}>
          <Text style={sty.panelTitle}>Game rules</Text>
          <Text style={sty.panelBody}>
            Twin Party is an offline game for the company. Your phone is your
            host.
            {'\n\n'}
            Gather your friends, put your phone on the table and follow the
            simple rules.
          </Text>
        </View>

        <View style={sty.panel}>
          <Text style={sty.panelTitle}>Rounds</Text>

          <Text style={sty.sectionTitle}>QUESTION</Text>
          <Text style={sty.panelBody}>
            • A question appears on the screen{'\n'}• There are no right or
            wrong answers in the game{'\n'}• Answer one by one or all at once
            {'\n'}• The main thing is the conversation, not the result
          </Text>

          <View style={sty.smallSpacer} />

          <Text style={sty.sectionTitle}>ACTION</Text>
          <Text style={sty.panelBody}>
            Action appears on the screen{'\n'}
            One player or the entire company performs a task{'\n'}
            Nothing is recorded or filmed{'\n'}
            Just perform the action and move on
          </Text>
        </View>

        <View style={sty.panel}>
          <Text style={sty.panelTitle}>How the game goes</Text>
          <Text style={sty.panelBody}>
            Twin Party is an offline game for the company. Your phone is your
            host.
            {'\n\n'}
            Gather your friends, put your phone on the table and follow the
            simple rules.
          </Text>
        </View>

        <View style={sty.panel}>
          <Text style={sty.panelTitle}>Party Mode</Text>
          <Text style={sty.panelBody}>
            QUESTION and ACTION alternate automatically{'\n'}
            Fast pace{'\n'}
            Minimal pauses
          </Text>
        </View>

        <View style={sty.panel}>
          <Text style={sty.panelTitle}>Chill Mode</Text>
          <Text style={sty.panelBody}>
            Mostly QUESTION{'\n'}
            Slow pace{'\n'}
            More time for conversation
          </Text>
        </View>

        <View style={sty.panel}>
          <Text style={sty.panelTitle}>Important to know</Text>
          <Text style={sty.panelBody}>
            The game works offline{'\n'}
            No accounts{'\n'}
            No scores or winners{'\n'}
            No one loses
          </Text>
        </View>

        <View style={sty.bottomPad} />
      </ScrollView>
    </Background>
  );
};

const sty = StyleSheet.create({
  ruleContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },
  panel: {
    backgroundColor: '#23113C',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  panelBody: {
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  smallSpacer: {
    height: 16,
  },
  bottomPad: {
    height: 120,
  },
});

export default TwinPartySpirtyDinnerRules;

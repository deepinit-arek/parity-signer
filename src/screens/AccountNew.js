// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Alert, ScrollView, View, Text, TouchableOpacity, Share, StyleSheet
} from 'react-native'
import { Subscribe } from 'unstated'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import AccountsStore from '../stores/AccountsStore'
import AccountSeed from '../components/AccountSeed'
import { selectAccount } from '../actions/accounts'
import AccountIconChooser from '../components/AccountIconChooser'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import AppStyles from '../styles'

import colors from '../colors'

export default class AccountNew extends Component {
  static navigationOptions = {
    title: 'New Account'
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Subscribe to={[AccountsStore]}>{
        accounts => {
          const selected = accounts.getSelected()
          return <View style={ styles.body } >
            <ScrollView style={ { padding: 20 } } containerStyle={ styles.bodyContainer }>
              <View style={ styles.top }>
                <Text style={ styles.titleTop }>CREATE ACCOUNT</Text>
                <Text style={ styles.title }>CHOOSE AN IDENTICON</Text>
                <AccountIconChooser
                  value={ selected.address }
                  onChange={({ address, seed }) => {
                    accounts.select(address)
                    accounts.update({ address, seed })
                    } } />
                <Text style={ styles.title }>ACCOUNT NAME</Text>
                <TextInput onChangeText={(name) => accounts.updateSelected({ name })}
                  value={selected.name}
                  placeholder="Enter a new account name"/>
              </View>
              <View style={ styles.bottom }>
                <Text style={ styles.hintText }>
                  On the next step you will be asked to backup your account, get pen and paper ready
                </Text>
                <Button
                  buttonStyles={ styles.nextStep }
                  title="Next Step"
                  onPress={ async () => {
                    await accounts.saveSelected()
                    Alert.alert('Account Created')
                    this.props.navigation.navigate('AccountList')
                    console.log('TEST') } } />
              </View>
            </ScrollView>
        </View>
        }
      }
      </Subscribe>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.bg,
    paddingBottom: 20,
     flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  top: {
    flex: 1
  },
  bottom: {
    flexBasis: 50,
    paddingBottom: 15
  },
  title: {
    fontFamily: 'Roboto',
    color: colors.bg_text_sec,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  titleTop: {
    color: colors.bg_text_sec,
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center'
  },
  hintText: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    paddingTop: 20,
    color: colors.bg_text_sec,
    fontWeight: '800',
    fontSize: 10
  },
  nextStep: {
    marginTop: 15,
  }
});

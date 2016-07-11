import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import IconTabBar from '../common/IconTabBar';
import BarberList from './BarberList';
import HaircutHistory from './HaircutHistory';
import Profile from './Profile';
import Pubnub from '../Pubnub';
import { gcmSenderID } from '../env';

class Main extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: this._onRegister.bind(this),
      onNotification: this._onNotification.bind(this),
      senderID: gcmSenderID
    });
  }

  _onRegister(registration) {
    var {isAdmin, token} = this.props;

    if (isAdmin) {
      Pubnub.enablePushNotificationsOnChannel('admin', registration.token);
    }

    Pubnub.enablePushNotificationsOnChannel(`customer_${token}`, registration.token);
  }

  _onNotification(notification) {
    if (notification.data) {
      this._showNotification(notification);
    } else {
      this._openNotification(notification);
    }
  }

  _showNotification(notification) {
    PushNotification.localNotification(notification);
  }

  _openNotification(notification) {
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar border navigator={this.props.navigator} />
        <ScrollableTabView tabBarPosition='bottom'
          renderTabBar={() => <IconTabBar titles={['Barbearias', 'Histórico de cortes', 'Minha conta']} />}>
          <View tabLabel='pole' style={[styles.tabView, styles.tabViewWithoutPadding]}>
            <BarberList navigator={this.props.navigator} />
          </View>
          <View tabLabel='scissor-2' style={[styles.tabView, styles.tabViewWithoutPadding]}>
            <HaircutHistory navigator={this.props.navigator} />
          </View>
          <ScrollView tabLabel='profile-2' style={styles.tabView}>
            <Profile navigator={this.props.navigator} />
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}

function select(store) {
  return {
    isAdmin: store.user.admin,
    token: store.user.token
  };
}

export default connect(select)(Main);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  tabViewWithoutPadding: {
    padding: 0,
  }
});

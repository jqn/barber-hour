import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HaircutDetails from './HaircutDetails';

export default class HaircutHistoryItem extends Component {
  _openDetails() {
    this.props.navigator.push({
      component: HaircutDetails,
      passProps: {appointment: this.props.appointment}
    });
  }

  _iconForStatus(status) {
    switch (status) {
      case 'finished':
        return 'alarm-on';
      case 'canceled':
        return 'alarm-off';
      case 'scheduled':
        return 'alarm';
    }
  }

  render() {
    const { appointment } = this.props;
    const { schedule, barber } = appointment;

    return(
      <TouchableNativeFeedback onPress={this._openDetails.bind(this)}>
        <View style={styles.card}>
          <View>
            <Text style={styles.date}>{schedule.day_number} de {schedule.month_name} às {schedule.hour}</Text>
            <Text style={styles.barber}>{barber.name}</Text>
            <View style={styles.statusContainer}>
              <Icon name={this._iconForStatus(appointment.status)} size={24} color='#003459' style={styles.icon} />
              <Text>{appointment.translated_status}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

var styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 2,
    flex: 1
  },
  date: {
    fontWeight: 'bold',
    color: '#292929',
    fontSize: 18
  },
  barber: {
    color: '#A2A2A2',
    fontSize: 18
  },
  icon: {
    marginRight: 5
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  }
});

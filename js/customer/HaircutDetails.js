import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Switch,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import BarberIcon from '../common/BarberIcon';
import AppointmentCanceled from './AppointmentCanceled';

import { cancelAppointment, getAppointment } from '../actions/appointments';

class HaircutDetails extends Component {
  componentDidMount() {
    if (!this.props.appointment) {
      this.props.dispatch(getAppointment('customer', this.props.appointmentId));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.replace({
        component: AppointmentCanceled
      });
    }
  }

  _cancelSchedule() {
    this.props.dispatch(cancelAppointment('customer', this.props.appointment.id));
  }

  _confirmCancelSchedule() {
    Alert.alert(
      'Cancelar horário',
      'Tem certeza que deseja cancelar esse horário?',
      [
        {text: 'Cancelar horário', onPress: () => {this._cancelSchedule()} },
        {text: 'Voltar', style: 'cancel'},
      ]
    );
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
    const { appointment, navigator, form } = this.props;
    var loadingContent;

    if (form.isLoading) {
      loadingContent = <View style={styles.loading}><ActivityIndicator /></View>;
    }

    var content;
    if (appointment) {
      const { schedule, barber, appointment_services } = appointment;
      const buttonLabel = this.props.form.isLoading ? 'Cancelando...' : 'Cancelar';

      content = (
        <View>
          <View style={styles.innerContainer}>
            <Text style={styles.title} numberOfLines={1}>{barber.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.info} numberOfLines={1}>{schedule.day_number} de {schedule.month_name} às {schedule.hour}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.statusContainer}>
              <Icon name={this._iconForStatus(appointment.status)} size={24} color='#003459' style={styles.icon} />
              <Text>{appointment.translated_status}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.info, styles.code]}>Código: #{appointment.id}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            {appointment_services.map((appointmentService) => {
              const icon = appointmentService.service_name === 'Corte de Cabelo' ? 'scissor-4' : 'razor';
              return(
                <View key={appointmentService.id} style={styles.serviceContainer}>
                  <BarberIcon name={icon} size={24} color='#003459' style={styles.serviceIcon} />
                  <Text style={styles.price}>{appointmentService.service_name}: {appointmentService.service_price}</Text>
                </View>
              )
            })}
          </View>
          {appointment.status === 'scheduled' ? (
            <View>
              <View style={styles.separator} />
              <View style={styles.innerContainer}>
                <Button
                  containerStyle={styles.button}
                  text={buttonLabel}
                  disabled={this.props.form.isLoading}
                  onPress={this._confirmCancelSchedule.bind(this)} />
              </View>
            </View>
          ) : (<View />)}
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon border navigator={navigator} />
        {loadingContent}
        {content}
      </View>
    );
  }
}

function select(store, ownProps) {
  return {
    form: store.appointments,
    appointment: ownProps.appointment || store.appointments.appointments.find(a => a.id === ownProps.appointmentId)
  };
}

export default connect(select)(HaircutDetails);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 55 : 0
  },
  innerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#111111'
  },
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    backgroundColor: '#DCDCDC',
    height: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  serviceIcon: {
    marginRight: 20
  },
  icon: {
    marginRight: 10
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  code: {
    marginBottom: 10
  },
  loading: {
    marginTop: 10
  }
});

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import Email from '../forms/Email';

import { update } from '../actions/account';

class EditProfile extends Component {
  _update() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(update(value));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.pop();
    }
  }

  getFormValue() {
    return {
      name: this.props.form.name || this.props.currentName,
      email: this.props.form.email || this.props.currentEmail
    };
  }

  render() {
    const Account = t.struct({
      name: t.String,
      email: Email
    });

    const buttonLabel = this.props.form.isLoading ? 'Alterando...' : 'Alterar';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={this.props.form.isLoading} />
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Editar conta</Text>
          <Form ref='form' type={Account} options={this.props.form} value={this.getFormValue()} />
          <Button containerStyle={styles.button} text={buttonLabel} onPress={this._update.bind(this)} disabled={this.props.form.isLoading} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.account,
    currentName: store.user.name,
    currentEmail: store.user.email
  };
}

export default connect(select)(EditProfile);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 60 : 0
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
});

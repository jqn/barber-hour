import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { connect } from 'react-redux';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import Main from '../customer/Main';
import BarberList from '../customer/BarberList';
import Login from './Login';
import FacebookButton from './FacebookButton';
import Toolbar from '../common/Toolbar';
import Logo from '../common/Logo';
import Button from '../common/Button';
import TextSeparator from '../common/TextSeparator';
import LargeButton from '../common/LargeButton';
import AccountTypeSelector from './AccountTypeSelector';
import PrivacyPolicy from './PrivacyPolicy';
import ServiceTerms from './ServiceTerms';

import { loginWithFacebook } from '../actions/login';

class Signup extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms
    });
  }

  _signup() {
    this.props.navigator.replace({
      component: AccountTypeSelector,
      passProps: {
        user: {
          name: 'Leonardo Tegon'
        }
      }
    });
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigator.replace({
        component: Main
      });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.formContainer}>
          <View>
            <TextInput placeholder='nome' />
            <TextInput placeholder='email' keyboardType='email-address' />
            <TextInput placeholder='senha' secureTextEntry={true} />
            <Button containerStyle={styles.button} text='Cadastrar-se' onPress={this._signup.bind(this)} />
          </View>
          <View style={styles.privacyContainer}>
            <Text>Ao se cadastrar, você concorda com os </Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={this._openServiceTerms.bind(this)}>
                <Text style={styles.link}>Termos de uso</Text>
              </TouchableOpacity>
              <Text> & com a </Text>
              <TouchableOpacity onPress={this._openPrivacyPolicy.bind(this)}>
                <Text style={styles.link}>política de privacidade</Text>
              </TouchableOpacity>
              <Text>.</Text>
            </View>
          </View>
          <TextSeparator style={styles.separatorContainer} />
          <FBLogin
            buttonView={<FacebookButton style={styles.facebookButton} text='Cadastrar-se com o Facebook'/>}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={['email']}
            onLogin={(event) => this.props.dispatch(loginWithFacebook(event))} />
        </View>
        <LargeButton text='Já possui uma conta? ' linkText='Entrar.' onPress={this._openLogin.bind(this)} />
      </View>
    );
  }
}

function select(store) {
  return {
    name: store.user.name,
    email: store.user.email,
    password: store.user.password,
    isLoggedIn: store.user.isLoggedIn
  }
}

export default connect(select)(Signup);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  logo: {
    width: 140,
    height: 140
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
  },
  privacyContainer: {
    marginTop: 5,
    alignItems: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  facebookButton: {
    marginBottom: 10,
  },
  separatorContainer: {
    marginBottom: 5
  },
  row: {
    flexDirection: 'row'
  }
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';

import styles from './styles';

export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: false,
      error: false,
    };
  }

  checkUser = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@GitHuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });
    try {
      await this.checkUser(username);
      await this.saveUser(username);
      navigation.navigate('User');
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { username, loading, error } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-light-content" />
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.text}>Inform a GitHub username</Text>
          {error && <Text style={styles.error}>user not found</Text>}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="type your github username here"
              underlineColorAndroid="transparent"
              value={username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <TouchableOpacity style={styles.button} onPress={this.signIn}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

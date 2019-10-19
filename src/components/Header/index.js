import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class Header extends Component {
  signOut = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Welcome');
  };

  render() {
    const { title } = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.left} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={this.signOut}>
            <Icon name="exchange" size={16} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(Header);

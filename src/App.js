import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import createNavigator from './routes';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userChecked: false,
      userLoggedIn: false,
    };
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GitHuber:username');
    this.setState({
      userChecked: true,
      userLoggedIn: !!username,
    });
  }

  render() {
    const { userChecked, userLoggedIn } = this.state;
    if (!userChecked) return null;
    const Routes = createNavigator(userLoggedIn);
    return <Routes />;
  }
}

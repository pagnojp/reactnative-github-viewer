import React, { Component } from 'react';
import {
  View, StatusBar, ActivityIndicator, FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import api from '../../services/api';
import styles from './styles';
import RepositoryItem from './RepositoryItem';

const TabIcon = ({ tintColor }) => (
  <Icon name="list-alt" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@GitHuber:username');
    const { data } = await api.get(`/users/${username}/repos`);
    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-light-content" />
        <View style={styles.container}>
          <Header title="Repositories" />
          {loading ? (
            <ActivityIndicator style={styles.loading} />
          ) : (
            this.renderList()
          )}
        </View>
      </>
    );
  }
}

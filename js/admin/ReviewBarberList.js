import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
  StatusBar
} from 'react-native';

import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import ReviewBarberListItem from './ReviewBarberListItem';
import { listBarbers } from '../actions/admin';

class ReviewBarberList extends Component {
  componentDidMount() {
    if (this.props.dataSource.getRowCount() === 0) {
      this.props.dispatch(listBarbers());
    }
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<ReviewBarberListItem key={rowID} navigator={this.props.navigator} barber={rowData} />);
  }

  _onRefresh() {
    this.props.dispatch(listBarbers());
  }

  render() {
    var refreshControl = <RefreshControl refreshing={this.props.isLoading} onRefresh={this._onRefresh.bind(this)} />
    var content;

    if (this.props.isLoading) {
      content = <ActivityIndicator />;
    } else if (this.props.dataSource.getRowCount() === 0) {
      content = <ScrollView refreshControl={refreshControl}><Text>Não existem barbearias cadastradas.</Text></ScrollView>;
    } else {
      content =
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          refreshControl={refreshControl}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}/>;
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon border navigator={this.props.navigator} title='Revisar barbearias' />
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

function select(store) {
  return {
    dataSource: dataSource.cloneWithRows(store.admin.barbers),
    isLoading: store.admin.isLoading
  };
}

export default connect(select)(ReviewBarberList);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  listContainer: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    padding: 10
  },
});
import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {playerFollowed} from '../actions/Follow.js';
import {playerInGame} from '../actions/InGame.js';

class Search extends Component {

  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,
      text: '',
      dataSource: [],
      arrayHolder: []
    }
  }

  componentDidMount() {

    var playerData = require('../data/playerdata.json');

    this.setState({isLoading: false, dataSource: playerData, arrayholder: playerData});

  }

  onSelectPlayer(player) {
    this.props.playerFollowed(player);
    this.props.navigation.goBack();
  }

  filterSearch(text) {

    const newData = this.state.arrayholder.filter(function(item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({dataSource: newData, text: text})
  }

  ListViewItemSeparator = () => {
    return (<View style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000000"
      }}/>);
  }

  render() {
    if (this.state.isLoading) {
      return (<View style={{
          flex: 1,
          paddingTop: 20
        }}>
        <ActivityIndicator/>
      </View>);
    }

    return (<View style={styles.MainContainer}>

      <TextInput style={styles.TextInputStyleClass} onChangeText={(text) => this.filterSearch(text)} value={this.state.text} underlineColorAndroid='transparent' placeholder="Search.."/>

      <FlatList data={this.state.dataSource} ItemSeparatorComponent={this.ListViewItemSeparator} renderItem={({item}) => <TouchableOpacity onPress={() => this.onSelectPlayer(item)}>
          <Text style={styles.rowViewContainer}>{item.team}.{item.name}</Text>
        </TouchableOpacity>} enableEmptySections={true} style={{
          marginTop: 10
        }} keyExtractor={(item, index) => index}/>

    </View>);
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {playerFollowed, playerInGame})(Search);

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 7
  },

  rowViewContainer: {
    fontSize: 17,
    padding: 10,
    color: 'black'
  },

  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  }

});

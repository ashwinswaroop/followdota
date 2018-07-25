import React, {Component} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import HomeItem from './HomeItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {playerNotInGame} from '../actions/NotInGame';
import SplashScreen from 'react-native-splash-screen'

class Home extends Component {

  //todo: add icon and splash screen pics to ios, check sorting bug, deploy on phones.

  constructor(props) {
    super(props);

    this.state = {

      liveData: {},
      isLoading: true,
      appState: AppState.currentState,
      serversOnline: true,
      info: false
    }
  }

   isAvailable = () => {
     timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, 'Request timed out');
    });

    const request = fetch('https://api.steampowered.com/IDOTA2Match_570/GetTopLiveGame/v1/?key=4E4585EDB476441753D1A1978FA68509&partner=0');

    return Promise
        .race([timeout, request])
        .then(response => response.json()).then((responseJson) => { this.setState({liveData: responseJson, isLoading: false}) })
        .catch(error => this.setState({liveData: {"game_list": []}, serversOnline: false, isLoading: false}) );
    }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.playerNotInGame();
    this.isAvailable();
    AppState.addEventListener('change', this._handleAppStateChange);
    SplashScreen.hide();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.setState({isLoading: true});
      this.props.playerNotInGame();
      this.isAvailable();
    }
    this.setState({appState: nextAppState});
  }

  onFollowPlayer = () => {
    return this.props.navigation.navigate('SearchScreen');
  }

  ListViewItemSeparator = () => {
    return (<View style={{
        height: 3,
        width: "100%",
        backgroundColor: "#000000"
      }}/>);
  }

  render() {

    if (this.state.isLoading) {
      return (<View style={{
          flex: 1,
          padding: 20
        }}>
        <ActivityIndicator/>
      </View>)
    }

    this.props.followedList.forEach(function(item, index) {item.order = index;});
    return (<View style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{
          flex: 1,
          alignItems: 'stretch'
        }}>
        <FlatList data={this.props.followedList.sort(function(a, b) {
            var diff = b.ingame - a.ingame;
            if (diff !== 0) {
              return diff;
            } else {
              return a.order - b.order;
            }
          })}
          ListFooterComponent={this.ListViewItemSeparator} ListHeaderComponent={this.ListViewItemSeparator} ItemSeparatorComponent={this.ListViewItemSeparator} renderItem={({item}) => <HomeItem player={item} liveData={this.state.liveData}/>} style={{
            marginTop: 0
          }} keyExtractor={(item, index) => index}/>
      </View>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={()=>this.setState({info: !this.state.info})}>
            <Icon name="information-variant" color="#000000" size={35} style={{
                paddingLeft: 2
              }}/>
          </TouchableOpacity>
          {!this.state.serversOnline&&!this.state.info&&<Text style={{ alignSelf: 'center', color: '#FF3333', fontSize: 15, fontWeight: 'bold'}}>DotA 2 servers offline</Text>}
          {this.state.info&&<Text style={{ alignSelf: 'center', color: '#2576A5', fontSize: 15, fontWeight: 'bold'}}>github.com/ashwinswaroop/followdota</Text>}
          <TouchableOpacity onPress={this.onFollowPlayer}>
            <Icon name="account-plus" color="#000000" size={35} style={{
                paddingRight: 5
              }}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
  }
}

const mapStateToProps = state => {
  return {followedList: state.followed.followedList};
};

export default connect(mapStateToProps,{playerNotInGame})(Home);

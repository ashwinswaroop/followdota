import React, {Component} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {playerUnfollowed} from '../actions/Unfollow.js';
import {playerInGame} from '../actions/InGame.js';
import {playerNotInGame} from '../actions/NotInGame.js';
import result from '../data/herodata.js'

class HomeItem extends Component {

  constructor(props) {

    super(props);

    this.state = {
      displayDetails: true
    }
  }

  fmtMSS(s)
  {
    return(s-(s%=60))/60+(9<s?' : ':':0')+s;
  }

  isInGame() {
    if (this.props.player.ingame == 0) {
      return false;
    } else {
      //Alert.alert(JSON.stringify(this.props.player));
      return true;
    }
  }

  colorStatusIcon() {
    if (this.isInGame()) {
      return "checkbox-blank-circle";
    } else {
      return "checkbox-blank-circle-outline";
    }
  }

  colorStatusText() {
    if (this.isInGame()) {
      return styles.online;
    } else {
      return styles.offline;
    }
  }

  onSelectPlayer(player) {
    this.props.playerUnfollowed(player);
  }

  ListViewItemSeparator = () => {
    return (<View style={{
        height: 3,
        width: "100%",
        backgroundColor: "#000000"
      }}/>);
  }

  playerInGame() {
    var hId;
    this.props.liveData.game_list.map((item) => {
      if (item.hasOwnProperty("players")) {
        if ((item.players.some((nextItem) => {
          hId = nextItem.hero_id;
          return (nextItem.account_id == parseInt(this.props.player.id));
        }) == true) && (this.props.player.ingame == 0)) {

          this.props.playerInGame(this.props.player, hId, item.players, {avgMmr: item.average_mmr, radiantScore: item.radiant_score, direScore: item.dire_score, radiantLead: item.radiant_lead, spectators: item.spectators, buildingState: item.building_state, gameTime: item.game_time});
        }
      }
    });

  }

  render() {

    this.playerInGame();
    return (<View>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{
              flexDirection: 'row'
            }}>
            {
              result.heroes.map((item, i) => item.id == this.props.player.hero_id && this.isInGame() &&< Image style = {{width: 60, height: 40, marginTop: 2}}source = {
                item.name
              } />)
            }
            <Text style={this.colorStatusText()}>{this.props.player.team}.{this.props.player.name}</Text>

          </View>
        </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}>
          <Icon name={this.colorStatusIcon()} color="green" size={20} style={{
              paddingTop: 10,
              paddingRight: 20
            }}/>
          <TouchableOpacity onPress={() => this.setState({displayDetails: !this.state.displayDetails})}>
            <Icon name={this.isInGame()&&this.state.displayDetails ? 'menu-up' : 'menu-down'} color="black" size={30} style={{
                paddingTop: 5,
                paddingRight: 20
              }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelectPlayer(this.props.player)}>
            <Icon name="account-remove" color="black" size={20} style={{
                paddingTop: 10,
                paddingRight: 10
              }}/>
          </TouchableOpacity>
        </View>
      </View>

      {
        this.isInGame() && this.state.displayDetails && <View style={{flexDirection: 'row', justifyContent: 'space-between'}}><View style={{
              flexDirection: 'row',
              marginTop: 30
            }}>
            {
               this.props.player.playerArray.slice(0,5).map((item) => result.heroes.map((item2) => item.hero_id == item2.id && this.isInGame() &&< Image style = {{width: 30, height: 20}}source = {
                item2.name
              } />))
            }
          </View>
          <View>
            {this.props.player.matchDetails.avgMmr!=0?<Text style={{color: 'black', paddingTop: 5, alignSelf: 'center', fontWeight: 'bold'}}> MMR: {this.props.player.matchDetails.avgMmr} </Text> : <Text style={{color: 'black', paddingTop: 5, alignSelf: 'center', fontWeight: 'bold'}}> Tournament </Text>}
            <Text style={{color: 'black', paddingTop: 5, alignSelf: 'center', fontWeight: 'bold'}}> {this.props.player.matchDetails.radiantScore}   :   {this.props.player.matchDetails.direScore} </Text>
            {this.props.player.hero_id!=0?<Text style={{color: 'black', paddingTop: 5, alignSelf: 'center', fontWeight: 'bold'}}> {this.fmtMSS(this.props.player.matchDetails.gameTime)} </Text> : <Text style={{color: 'black', paddingTop: 5, alignSelf: 'center', fontWeight: 'bold'}}> Pre-game </Text>}
          </View>
          <View style={{
                flexDirection: 'row',
                marginTop: 30
              }}>
              {
                 this.props.player.playerArray.slice(5).map((item) => result.heroes.map((item2) => item.hero_id == item2.id && this.isInGame() &&< Image style = {{width: 30, height: 20}}source = {
                  item2.name
                } />))
              }
            </View>
          </View>
      }
    </View>)
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {playerUnfollowed, playerInGame, playerNotInGame})(HomeItem);

const styles = StyleSheet.create({

  online: {
    fontSize: 17,
    padding: 10,
    paddingLeft: 10,
    color: "black"
  },

  offline: {
    fontSize: 17,
    padding: 10,
    paddingLeft: 10,
    color: "black"
  }
});

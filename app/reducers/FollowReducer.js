const initialState = {
  followedList: [{
      id: "86745912",
      name: "Arteezy",
      team: "EG",
      ingame: 0,
      hero_id: 0
    },
    {
      id: "111620041",
      name: "Sumail",
      team: "EG",
      ingame: 0,
      hero_id: 0
    },
  ]
};

const FollowReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_FOLLOWED':
      if(state.followedList.slice().some(item=>item.id==action.data.id)==false){
        return { ...state,
          followedList: [...state.followedList, action.data]
        };
      }
      else{
        return state;
      }
    case 'PLAYER_UNFOLLOWED':
      return { ...state,
        followedList: [...state.followedList.filter(item => item.id != action.data.id)]
      };
    case 'PLAYER_INGAME':
      return { ...state,
        followedList: [...state.followedList.map(item => item.id == action.data.id ? { ...item,
          ingame: 1, hero_id: action.hero, playerArray: [...action.pArray], matchDetails: action.mDetails
        } : item)]
      };
    case 'PLAYER_NOTINGAME':
      return { ...state,
        followedList: [...state.followedList.map(item => { return { ...item, ingame: 0, hero_id: 0, playerArray: [], matchDetails: {} }})]
      };
    default:
      return state;
  }
};

export default FollowReducer;

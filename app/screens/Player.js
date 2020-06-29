import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import Slider from 'react-native-slider';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../styles/Player';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import { connect } from 'react-redux';
import AnimationArtWork from '../components/AnimationArtwork'
TrackPlayer.setupPlayer();

export default class Player extends React.Component {
  constructor(props){
    super(props)
    // 
    // this.playlist = this.props.route.params.playlist
    // this.continue = this.props.route.params.countiue
    // this.index = this.props.route.params.index
    // this.isSeeking = false;
    // this.shouldPlayAtEndOfSeek = false;
    // this.continue = false;
    // this.status = this.props.route.params.status
  }
  state = {
        AudioStatus: true,
        CurrentPlayTitle : '',
        CurrentPlayArtist : '',
        CurrentPlayImage : ''

      };

  UNSAFE_componentWillMount() {
    if(this.countiue = "false"){
      this.UpdateTrack();
          // if(this.status == "Song"){
          //   TrackPlayer.destroy()
          //   TrackPlayer.add(this.playlist[this.index])
          //   TrackPlayer.play()
          // }
          // else{
            // TrackPlayer.destroy()

            // TrackPlayer.add(this.playlist)
            TrackPlayer.play()
    }
  }

  
  async componentDidMount() {
    
    // TrackPlayer.updateOptions({
    //   stopWithApp: false,
    //   capabilities: [
    //     TrackPlayer.CAPABILITY_PLAY,
    //     TrackPlayer.CAPABILITY_PAUSE,
    //     TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    //     TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    //     TrackPlayer.CAPABILITY_STOP
    //   ],
    // });
    this.UpdateTrackUI();
    this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      this.UpdateTrack();
  });
    this.onTrackChange = TrackPlayer.addEventListener('playback-state', async(data) => {
      this.UpdateTrackUI()
    })
  }
  _goBack = () => {
    this.props.navigation.goBack();
  }


  togglePlayback = async () => {
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // if (currentTrack == null) {
    //   TrackPlayer.reset();
    //   await TrackPlayer.add(this.playlist);
    //   TrackPlayer.play();
    // } else {
      if(await TrackPlayer.getState() === 2){
        TrackPlayer.play();
      }else{
        TrackPlayer.pause();
      }
    // }
    
    this.UpdateTrackUI();
    
  }
  
  skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log(error);
      TrackPlayer.stop();
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }
    
  skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      this.UpdateTrack();
    } catch (error) {
      console.log(error);
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }

  UpdateTrack = async () => {
    // if(this.status == "Playlist"){
        var current_id = await TrackPlayer.getCurrentTrack();
      if(current_id){
        var track = await TrackPlayer.getTrack(current_id);

        this.setState({
          CurrentPlayTitle : track.title,
          CurrentPlayArtist : track.artist,
          CurrentPlayImage : {uri: track.artwork},
        });
      }else{
        this.setState({
          CurrentPlayTitle : 'Bài Hát',
          CurrentPlayArtist : 'Ca Sĩ',
          CurrentPlayImage : {uri: 'https://musicapp1509.000webhostapp.com/Hinhanh/Ca_si/Hi%E1%BB%81n%20H%E1%BB%93.jpg'}
        });
      }
    // }
    // else
    // {
    //   this.setState({
    //     CurrentPlayTitle : this.playlist[this.index].title,
    //     CurrentPlayArtist : this.playlist[this.index].artist,
    //     CurrentPlayImage : {uri: this.playlist[this.index].artwork}
    //   });
    // }
  }

  UpdateTrackUI = async () => {
    if(await TrackPlayer.getState() == 2){
      this.setState({
        AudioStatus: true
      });
    } else if(await TrackPlayer.getState() == 3){
      this.setState({
        AudioStatus: false
      });
    } else if(await TrackPlayer.getState() == 6){
      this.setState({
        AudioStatus: false
      });
    }
  }
  
  render() {
  
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ded5d6"></StatusBar>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={require('../icons/icon-jiantou.png')} style={styles.downButton} resizeMode='contain'/>
          </TouchableOpacity>
          <Text style={styles.song}>{this.state.CurrentPlayTitle}</Text>
        </View>
        <View style={styles.singer}>
          <Text style={styles.nameSinger}>{this.state.CurrentPlayArtist}</Text>
        </View>
        <View style={styles.image}>
          {/* <Image source={this.state.CurrentPlayImage} style={styles.imageSong}></Image> */}
          
          <AnimationArtWork CurrentPlayImage={this.state.CurrentPlayImage} styles={styles.imageSong} playing={this.state.playerState === 3} />
        </View>
        <View style={styles.taskBar}>
          <TouchableOpacity>
            <Image source={require('../icons/icon-like.png')} style={styles.favorite} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../icons/Playlist.png')} style={styles.list} resizeMode='contain'/>
          </TouchableOpacity>
        </View>
       
        <View style={styles.slider}>
        <TrackStatus />
        </View>
        <View style={styles.control}>
          <TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.skipToPrevious()}>
						<Image source={require('../icons/previous.png')} style={styles.backward} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.togglePlayback()}>
            <Image source={ this.state.AudioStatus ? require('../icons/play.png'): require('../icons/pause.png') } style={styles.pause} activeOpacity={1} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.skipToNext()}>
            <Image source={require('../icons/next.png')} style={styles.forward} resizeMode='contain'/>
          </TouchableOpacity>
        </View>

      </View>
    );

  }

} 

class TrackStatus extends ProgressComponent {

  state = {
    duration: 0,
    isSeeking: false,
    SliderDisable : true
  }
    formatTime(seconds) {
      if(this.state.SliderDisable){
        this.TrackSlider();
      }
      return seconds > 3600 
      ?
        [
          parseInt(seconds / 60 / 60),
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
      :
        [
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
    }
  
    
    TrackSlider = async () => {
      if(await TrackPlayer.getState() == 2){
        this.setState({
          SliderDisable: false
        });
      } else if(await TrackPlayer.getState() == 3){
        this.setState({
          SliderDisable: false
        });
      } else if(await TrackPlayer.getState() == 0){
        this.setState({
          SliderDisable: true
        });
      }
    }

    render () {
      return (
        
        <View>
          <Slider 
                      minimumValue          = {0}
                      maximumValue          = {this.state.duration}
                      thumbTintColor        = '#FFFFFF'
                      minimumTrackTintColor = '#000000'
                      maximumTrackTintColor = '#808080'
                      step                  = {1}
                      disabled              = {this.state.SliderDisable}
                          
                      onValueChange={ val=>{
                                            TrackPlayer.pause();
                                            this.seek = val;
                                            this.setState({isSeeking:true})
                                          }}
                      onSlidingComplete={ val=>{
                                            TrackPlayer.play();
                                            this.setState(()=> {
                                              TrackPlayer.seekTo(this.seek);
                                              this.position = this.seek;
                                            })
                                          }}
                        value={this.state.position}                
                      ></Slider>
                      <View style={{ marginTop: -12, flexDirection: "row", justifyContent: "space-between" }}>
                          <Text style={[styles.textLight, styles.timeStamp]}>{this.formatTime(this.state.position)}</Text>
                          <Text style={[styles.textLight, styles.timeStamp]}>{this.formatTime(this.state.duration)}</Text>
                      </View>
        </View>
      )
    }
  }




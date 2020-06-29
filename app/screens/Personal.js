import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Item,
  Platform,
  ImageBackground,
} from 'react-native';
import {ListItem, Image} from 'react-native-elements';

const drawerCover = require('../icons/cover-personal.jpeg');

const list = [
  {
    title: 'Danh sách yêu thích',
    icon: 'queue-music',
  },
  {
    title: 'Đăng xuất',
    icon: 'exit-to-app',
  },
];

export default class Personal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
    };
  }
//   setSelection = (value) => {
//     // console.log(value)
//     this.setState({isFetching: !value});
//   };

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isFetching) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <StatusBar barStyle="default" translucent />
          <View style={styles.container}>
            <ImageBackground source={drawerCover} style={styles.top}>
              {/* <Image
                style={styles.imageStyle}
                source={{
                  uri:
                    'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png',
                }}></Image> */}

              <Text
                style={{
                  fontSize: 32,
                  marginHorizontal: 20,
                  marginTop: 130,
                  color: 'white',
                }}>
                Lê Quý Đôn
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 20,
                  marginTop: 8,
                  color: 'white',
                }}>
                lequydon4199@gmail.com
              </Text>
            </ImageBackground>

            <View style={styles.mid}>
              {/* {list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
                bottomDivider
                chevron
              />
            ))} */}
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigate('SongList', {
                      title: list[0].title,
                      type: list[0].type,
                      data: this.props.data,
                    })
                  }
                  activeOpacity={0.3}>
                  <ListItem
                    title={list[0].title}
                    leftIcon={{name: list[0].icon}}
                    bottomDivider
                    chevron
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigate('Login', {
                      title: list[1].title,
                      type: list[1].type,
                    })
                  }
                  activeOpacity={0.3}>
                  <ListItem
                    title={list[1].title}
                    leftIcon={{name: list[1].icon}}
                    bottomDivider
                    chevron
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <StatusBar barStyle="default" translucent />
          <View style={styles.container}>
            <ImageBackground source={drawerCover} style={styles.top}>
              {/* <Image
                style={styles.imageStyle}
                source={{
                  uri:
                    'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png',
                }}></Image>
              <Text style={styles.text}>Lê Quý Đôn</Text>
              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 20,
                  marginTop: 8,
                  color: 'white',
                }}>
                lequydon4199@gmail.com
              </Text> */}
            </ImageBackground>

            <View
              style={{
                flex: 6,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                Bạn chưa đăng nhập. Xin vui lòng đăng nhập
              </Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigate('Login')}>
                <Text style={styles.buttonText}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  top: {
    flex: 3,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    alignSelf: 'stretch',
  },
  mid: {
    flex: 6,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  text: {
    fontSize: 32,
    marginHorizontal: 20,
    marginTop: 8,
    color: 'white',
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginHorizontal: 20,
    marginTop: 90,
  },
  buttonContainer: {
    backgroundColor: 'rgb(221,97,97)',
    width: 140,
    height: 55,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

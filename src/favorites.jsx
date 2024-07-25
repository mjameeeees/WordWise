import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";

function Favorites({navigation}) {
  const DashboardButton = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={Style.screen}>
      <View style={Style.nav}>
        <Image style={Style.logo} source={require('./logo.png')}/>
      </View>
      <View style={Style.dictionary}>
        <View style={Style.content}>
          <View style={Style.contentHeart}>
            <Text style={Style.keyWord}>Favorites</Text>
            <TouchableOpacity><Image style={Style.fav} source={require('./heart.png')} /></TouchableOpacity>
          </View>
          <Text style={Style.meaning}>
            the principal substance (such as written matter, illustrations, or
            music) offered by a website
          </Text>
        </View>
      </View>
      <View style={Style.footer}>
        <TouchableOpacity onPress={DashboardButton}>
          <Image style={Style.footerButton} source={require('./home.png')}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={Style.footerButton} source={require('./fav.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}const Style = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    height:20,
    width: 150
  },
  nav: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    backgroundColor: "#804674",
  },
  dictionary: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-start",
  },
  content: {
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 15,
    borderWidth: 0.5,
  },
  contentHeart: {
    flexDirection: "row",
   justifyContent: "space-between"
    },
  keyWord: {
    fontSize: 20,
    marginLeft: 20,
    bottom: 20,
    fontFamily: "IBMPlexSans-Bold",
  },
  meaning: {
    marginLeft: 50,
    fontFamily: "IBMPlexSans-Regular",
    bottom: 15,
    paddingRight: 15,
  },
  fav: {
    height: 20,
    width: 20,
    right: 15,
    bottom:10
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#804674",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  footerButton: {
    height: 20,
    width: 20,
  }
});

export default Favorites;
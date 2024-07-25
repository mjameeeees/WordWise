import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image, FlatList } from "react-native";
import axios from "axios";

import { ActivityIndicator } from "react-native";

function Dashboard({ navigation }) {
  const Favorite = () => {
    navigation.navigate("Favorites");
  };


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [word,setWord] = useState('Welcome');
  const [favorites, setFavorites] = useState([]);



  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchDictionaryEntry = async (word) => {
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const capitalizedWord = capitalizeFirstLetter(response.data[0].word);
        // Update only the word in the first entry
        const updatedData = [...response.data];
        updatedData[0].word = capitalizedWord;
        setData(updatedData)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDictionaryEntry();
    
  }, []);

  const fetchData = async (word) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const capitalizedWord = capitalizeFirstLetter(response.data[0].word);
      // Update only the word in the first entry
      const updatedData = [...response.data];
      updatedData[0].word = capitalizedWord;
      setData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(word);
  };
  
  

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error fetching data: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return null; // Handle case where data is still loading or not fetched yet
  }

  const renderMeaning = ({ item }) => (
    <View>
      <Text style={Style.meaning}>{item.partOfSpeech}</Text>
      {item.definitions.map((definition, index) => (
        <Text  style={Style.meaning} key={index}>{index + 1}. {definition.definition}</Text>
      ))}
    </View>
  );

  return (
    <View style={Style.screen}>
      <View style={Style.nav}>
        <Image style={Style.logo} source={require("./logo.png")} />
      </View>
      <View style={Style.searchContainer}>
        <TextInput style={Style.search} placeholder="Search" value={word} onChangeText={setWord}/>
        <TouchableOpacity onPress={handleSearch}> 
          <Image style={Style.searchIcon} source={require('./magnifying-glass.png')}/>
        </TouchableOpacity>
      </View>
      <View style={Style.dictionary}>
        <View style={Style.content}>
          <View style={Style.contentHeart}>
            <Text style={Style.keyWord}>{data[0].word}</Text>
            <TouchableOpacity>
              <Image style={Style.fav} source={require("./heart.png")} />
            </TouchableOpacity>
          </View>
          <View style={Style.meaningContainer}>
          <FlatList
        data={data[0].meanings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMeaning}
      />
          </View>
        </View>
      </View>
      <View style={Style.footer}>
        <TouchableOpacity>
          <Image style={Style.footerButton} source={require("./home.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Favorite}>
          <Image style={Style.footerButton} source={require("./fav.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Style = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    height: 20,
    width: 150,
  },
  nav: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    backgroundColor: "#804674",
  },
  searchContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  search: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
    height: 30,
    borderWidth: 0.5,
  },
  searchIcon: {
    height: 25,
    width: 25,
  },
  dictionary: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-start",
  },
  content: {
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 15,
   
  },
  contentHeart: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    right:15,
    paddingBottom: 10,
  },
  keyWord: {
    fontSize: 20,
   
    fontFamily: "IBMPlexSans-Bold",
  },
  meaningContainer: {
    bottom: 15,
    padding:20,
  },
  meaning: {
    fontFamily: "IBMPlexSans-Regular",
    textAlign: "justify",
    padding:3
  },
  fav: {
    height: 20,
    width: 20,
    left:10,
   
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
  },
});
export default Dashboard;

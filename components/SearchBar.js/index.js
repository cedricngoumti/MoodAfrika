// SearchBar.js
import React, { useRef,useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button,Text, TouchableOpacity } from "react-native";

import  Entypo  from "react-native-vector-icons/Entypo";
import  Feather  from "react-native-vector-icons/Feather";
import { COLORS } from "../../utils/Colors";

const SearchBar = (props) => {
  const refSearchbar = useRef();
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          ref={refSearchbar}
          style={styles.input}
          placeholder="Rechercher"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
          autoFocus={props.autoFocus}
          onSubmitEditing={() => props.searchFunction() }
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {props.clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("")
              //Keyboard.dismiss();
              //props.setClicked(false);
              //props.deleteSuggestion();
              refSearchbar.current.focus();
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {(props.clicked) && (
        <TouchableOpacity onPress={() => props.searchFunction()}>
          <Text style={{color:COLORS.accent,fontSize:14, paddingHorizontal:10,marginHorizontal:5}}>Rechercher</Text>
        </TouchableOpacity>
      )}
      
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    height:40,

  },
  searchBar__unclicked: {
    paddingHorizontal: 10,
    paddingTop:0,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
  },
  searchBar__clicked: {
    paddingHorizontal: 10,
    paddingTop:0,
    flexDirection: "row",
    width: "75%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 14,
    marginLeft: 10,
    width: "90%",
    
  },
});
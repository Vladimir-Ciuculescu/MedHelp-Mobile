import React from 'react'
import {Text,View, StyleSheet,TouchableOpacity,ImageBackground ,ScrollView,Image} from 'react-native'
import { MaterialIcons ,Ionicons ,AntDesign ,FontAwesome,Fontisto,MaterialCommunityIcons } from '@expo/vector-icons';
import { globallyStyles } from '../global/styles';

import axios from 'axios';
import {Avatar,Title,} from 'react-native-paper';

export default class ProfileCaregiver extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        name : this.props.screenProps.displayName +" "+this.props.screenProps.displayPrenume,      
        phone:'07232323141',
        email: this.props.screenProps.email,
        varsta:'',
        numePacient:'',
        data_nasterii:'',
        disponibil:1,
        adresa:'',
    }

    //in functie de mailul de la login
    // in functie de numele de la login
    componentDidMount(){
      fetch(`http://192.168.0.183:8080/caregivers/${this.state.email}`, {
        method: 'GET',
        headers: {
             Accept: 'application/json',
            'Content-Type': 'application/json'
        },     
        }).then(response => response.json() )
            .then(response=> {
              this.setState({
                  phone:response.phone,
                  data_nasterii:response.birthDate,
                  varsta:response.age,
                  disponibil:response.available,
                  adresa:response.address,
              })
        }).catch((error) => { console.log(error)}); 

        /**
         * "phone":"07241215",
            "birthDate":"2020-03-03",
            "age":"35",
            "address":"Strada Nicolae Iorga",
             "available":true
         */
    }
   
    render() {
        return (  
            <ImageBackground source={require('../assets/GREEN.png')} style={{flex:1}}>
              <ScrollView style={styles.container}> 
                              
                    <TouchableOpacity onPress = {() => this.props.navigation.openDrawer()} style={globallyStyles.menu} >
                        <MaterialIcons size={30} name = "menu"  />
                    </TouchableOpacity> 
                <View style={styles.userInfoSection}>
                  <View style={{flexDirection: 'row', marginTop: 15,marginLeft:-20}}>
                        <Avatar.Image 
                            source={require("../assets/profilePicture.jpg")}                       
                            size={100}
                        />
                        <View style={{marginLeft: 20}}>
                            <Title style={[styles.title, { marginTop:15, marginBottom: 5,}]}>
                              Ingrijitor: {this.state.name}
                            </Title>
                            
                        </View>
                    </View>
                </View>            
                <View style={styles.userInfoSection}>
                    
                    <View style={styles.row}>
                        <AntDesign name="phone" size={24} color="#5f27cd" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Telefon</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialIcons name="alternate-email" size={24} color="#10ac84" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Email</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="home" size={24} color="#f368e0" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Adresa</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.adresa}</Text>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="idcard" size={24} color="#576574" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Data nasterii</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.data_nasterii}</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="intersex" size={24} color="#576574" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Varsta</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.varsta}</Text>
                    </View>
                   
                    <View style={styles.row}>
                        <MaterialIcons name="event-available" size={24} color="#0abde3" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Disponibilitate</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.disponibil == 1 ?' DA' :'NU'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Fontisto name="doctor" size={24} color="black" />
                        <Text style={{fontSize:20,marginLeft:10,color:'#333',fontWeight:'300'}} >Nume pacient</Text>
                        <Text style={{color:"#2c3e50", marginLeft: 20,fontSize:20}}>{this.state.disponibil == 0 ? this.state.numePacient : 'Nu aveti pacient'}</Text>
                    </View>
                   
                </View>
       
            <View style={styles.menuWrapper}>
               
                </View>
                </ScrollView>
            </ImageBackground>                             
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    container2:{
        flex:1,
        padding:20,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 20,
      color:'#333',
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flex:1,
      flexDirection: 'row',
      marginBottom: 10,
      // justifyContent:'space-between',
      alignItems:'center',
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#000',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });
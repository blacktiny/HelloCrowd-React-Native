import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
// import { BoxShadow } from 'react-native-shadow'

import { SvgIcon } from '../components/SvgIcon'
import PersonInfoCard from '../components/PersonInfoCard'
import { Theme } from '../constants/constants'

import { getLocationByWhat3Words } from '../actions/ProfileDetailAction'

const updateBasicInfo = require('../../assets/arrow_next.png')

const { width, height } = Dimensions.get('window')

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Greg',
      lastName: 'Kockott',
      IDNumber: '7902155220080',
      email: 'greg@hellocrowd.net',
      emailVerified: false,
      mobileNumber: '828014085',
      mobileNumberVerified: false,
    }
  }

  componentDidMount() {
    this.props.getLocationByWhat3Words();
  }

  gotoBackScreen = () => {
    this.props.navigation.navigate('MyProfile');
  }

  onEmailVerfication = () => {
    this.setState({emailVerified: true});
  }

  onMobileNumberVerfication = () => {
    this.setState({mobileNumberVerified: true});
  }

  render() {
    const { firstName, lastName, IDNumber, email, mobileNumber, emailVerified, mobileNumberVerified } = this.state;
    let { location } = this.props;
    console.log('location = ', location);
    if (location.length < 1) {
      location = {
        'lng': -0.203586,
        'lat': 51.521251
      }
    }
    const shadowOpt = {
      width: 160,
      height: 170,
      color:"#190000",
      x: 0,
      y: 5
  }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>

        <View style={styles.headerBack}>
          <View style={styles.headerSection}>
            <SvgIcon name="left-open" color={Theme.colorLightGreen} onPress={() => this.gotoBackScreen()} />
            <Text style={styles.basicInfoText}>{'Basic Info'}</Text>
          </View>
          <Text style={styles.description}>{'Your name, ID number, etc'}</Text>
        </View>
        <View style={styles.headerUnderLine} />

        <View style={{marginTop: 15}}>
          <PersonInfoCard placeholder={'first name'} value={'Greg'} editable={false} />
        </View>

        <View style={{marginTop: 15}}>
          <PersonInfoCard placeholder={'last name'} value={'Kockott'} editable={false} />
        </View>

        <View style={{marginTop: 15}}>
          <PersonInfoCard placeholder={'id number'} value={IDNumber} editable={false} verifyStatus={'verified'} />
        </View>

        <View style={{marginTop: 15}}>
          <PersonInfoCard inputType={'email'} placeholder={'email address'} value={email} editable={!emailVerified} verifyStatus={emailVerified ? 'verified' : 'unverified'} onVerifyBtnClicked={() => this.onEmailVerfication()} />
        </View>

        <View style={{marginTop: 15}}>
          <PersonInfoCard inputType={'phone'} placeholder={'mobile number'} value={mobileNumber} editable={!mobileNumberVerified} verifyStatus={mobileNumberVerified ? 'verified' : 'unverified'} onVerifyBtnClicked={() => this.onMobileNumberVerfication()}/>
        </View>

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.googleMap}
          region={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>

        <View style={styles.blankBottomView} />

        </ScrollView>
        
        <TouchableOpacity style={styles.updateButton} >
          <Text style={styles.updateButtonText}>{'update basic info'.toUpperCase()}</Text>
          <Image style={styles.updateBasicInfoIcon} source={updateBasicInfo} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f1f3f8',
  },
  scrollView: {
    flexGrow: 1,
  },
  headerBack: {
    width: '100%',
    height: 97,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: '#2a3549',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 38
  },
  headerUnderLine: {
    width: 95,
    height: 4,
    backgroundColor: Theme.colorLightGreen,
    marginTop: -4
  },
  headerSection: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  gobackButton: {
    width: 30,
    height: 30,
    backgroundColor: 'blue'
  },
  basicInfoText: {
    fontSize: 20,
    fontFamily: Theme.FONT_BOLD,
    color: Theme.colorWhite,
    textAlign: 'center',
    marginLeft: 15,
    color: Theme.colorLightGreen,
    marginTop: -6
  },
  description: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 13,
    color: Theme.colorLightGrey,
    marginLeft: 28,
    // marginTop: 5
  },
  googleMap: {
    width: '92%',
    height: 150,
    marginTop: 15,
    marginLeft: '4%'
  },
  updateButton: {
    position: 'absolute',
    width: '100%',
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('90%') - StatusBar.currentHeight,
    paddingLeft: '4%',
    paddingRight: '4%',
    backgroundColor: Theme.colorLightGreen
  },
  updateButtonText: {
    width: '90%',
    fontFamily: Theme.FONT_BOLD,
    fontSize: 14,
    color: Theme.colorWhite,
    letterSpacing: 2,
    textAlign: 'center',
    paddingLeft: 17
  },
  updateBasicInfoIcon: {
    width: 17,
    height: 11
  },
  blankBottomView: {
    height: 150
  }
});

function mapStateToProps(state) {
  return {
    location: state.profileDetailReducer.location
  }
}

const mapDispatchToProps = {
  getLocationByWhat3Words
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileScreen)

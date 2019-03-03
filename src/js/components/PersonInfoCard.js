import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Item, Label, Input, Form } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
// import { BoxShadow } from 'react-native-shadow'

import { SvgIcon } from './SvgIcon'
import { Theme } from '../constants/constants';

const iconInspection = require('../../assets/icon_inspection.png')
const iconChecked = require('../../assets/icon_checked.png')

const { width, height } = Dimensions.get('screen')

export default class PersonInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Greg',
      lastName: 'Kockott',
      isButtonDisabled: true,
      textValue: '',
      isSpaceAdded: false,
      isSpaceRemoved: false
    }
  }

  componentDidMount() {
    const { inputType, value } = this.props;

    this.setState({textValue: value});

    if (inputType === 'email') {
      this.emailValidation(value);
    } else if (inputType === 'phone') {
      let phoneNumber = value.substr(0, 2) + ' ' + value.substr(2, 3) + ' ' + value.substr(5, 4);
      this.setState({textValue: '+27 ' + phoneNumber});
    }
  }

  emailValidation = (value) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(value) === false) {
      this.setState({isButtonDisabled: true});
    } else {
      this.setState({isButtonDisabled: false});
    }
  }

  onInputValueChanged = (value) => {
    const { textValue,isSpaceAdded, isSpaceRemoved } = this.state
    const { inputType } = this.props

    if (inputType === 'email') {
      this.emailValidation(value);
    } else if (inputType === 'phone') {
      if (value.length === 3) {
        value += ' ';
      } else if (value.length === 15) {
        this.setState({isButtonDisabled: false});
      } else if (value.length < 15) {
        this.setState({isButtonDisabled: true});
      }
      if ((value.length === 6 || value.length === 10) && !isSpaceRemoved) {
        value += ' ';
      } else if ((value.length === 6 || value.length === 10) && isSpaceRemoved) {
        value = value.slice(0, value.length - 1);
        this.setState({isSpaceRemoved: false});
      } else if (value.length === 7 || value.length === 11) {
        this.setState({isSpaceRemoved: true});
      }
    } else {

    }

    this.setState({textValue: value});
  }

  onVerifyBtnClicked = () => {
    const { onVerifyBtnClicked } = this.props
    
    onVerifyBtnClicked()
  }

  render() {
    const { isButtonDisabled, textValue } = this.state;
    const { inputType, placeholder, value, verifyStatus, editable } = this.props;
    const shadowOpt = {
      width: 160,
      height: 170,
      color:"#190000",
      x: 0,
      y: 5
  }
    return (
      <View style={styles.cardContainer}>
        <Form style={styles.form}>
          <Item floatingLabel style={styles.inputItem}>
            <Label style={styles.label}>{placeholder}</Label>
            <Input style={styles.input} defaultValue={textValue} keyboardType={inputType === 'phone' ? 'numeric' : 'default'} maxLength={inputType === 'phone' ? 15 : 255} value={textValue} onChangeText={(val) => this.onInputValueChanged(val)} editable={editable} underlineColorAndroid='transparent' />
          </Item>
        </Form>
        { verifyStatus === 'verified' && <View style={styles.okIcon}><SvgIcon name="ok" color={'#4cd964'} /></View>}
        { verifyStatus === 'unverified' && !isButtonDisabled &&
          <TouchableOpacity style={styles.verifyButton} onPress={() => this.onVerifyBtnClicked()}>
            <Text style={styles.btnText}>{'verify'.toUpperCase()}</Text>
          </TouchableOpacity>}
        { verifyStatus === 'unverified' && isButtonDisabled &&
          <TouchableOpacity style={styles.verifyButton} onPress={() => this.onVerifyBtnClicked()} disabled>
            <Text style={styles.btnText}>{'verify'.toUpperCase()}</Text>
          </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '4%',
    paddingTop: 5,
    paddingLeft: 8,
    backgroundColor: Theme.colorWhite,
  },
  form: {
    width: '80%',
    // alignSelf: 'center'
  },
  inputItem: {

  },
  label: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 12,
    letterSpacing: 1,
    color: Theme.colorLightGrey,
    marginTop: -15,
    marginLeft: 4,
    textTransform: 'uppercase'
  },
  input: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 15,
    color: Theme.colorBlack,
    marginTop: -15
  },
  verifyButton: {
    width: 68,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colorLightGreen,
    marginTop: -5
  },
  btnText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 11,
    letterSpacing: 2,
    color: Theme.colorWhite
  },
  okIcon: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

PersonInfoCard.propTypes = {
  inputType: PropTypes.string || 'normal',
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  verifyStatus: PropTypes.string || 'none',
  onVerifyBtnClicked: PropTypes.func,
  editable: PropTypes.bool || false
}

// function mapStateToProps(state) {
//   return {
//   }
// }

// export default connect(
//   mapStateToProps
// )(PersonInfoCard)

import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {


    constructor() {
        super();
        this.state = {
            hasCamPermission: null,
            scanned: false,
            buttonState: "normal",
            scannedStudentId: '',
            scannedBookId: ''


        }
    }

    getCameraPermission = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCamPermission: status === "granted",
            scanned: false,
            buttonState: id,

        })
    }

    handlebarcodescanner = async ({ data }) => {
        const { buttonState } = this.state

        if (buttonState === 'BookId') {
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            });
        }
        else if (buttonState === 'StudentId') {
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: "normal"

            })
        }
    }


    render() {
        const hasCamPermission = this.state.hasCamPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (hasCamPermission && buttonState != "normal") {

            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>


                    <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handlebarcodescanner}
                        style={StyleSheet.absoluteFillObject} />


                </View>
            );

        }
        else if (buttonState === "normal") {

            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >

                    <View>
                        <Image
                            source={require("../assets/booklogo.jpg")}
                            style={{ width: 200, height: 200 }} />
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>Wily</Text>
                    </View>

                    <View style={styles.inputView}>

                        <TextInput style={styles.inputBox} placeholder="Book Id" value={this.state.scannedBookId} />

                        <TouchableOpacity style={styles.scanButton} onPress={() => {
                            this.getCameraPermission("BookId")
                        }}>
                            <Text style={styles.buttonText}> Scan</Text>


                        </TouchableOpacity>

                    </View>

                    <View style={styles.inputView}>

                        <TextInput style={styles.inputBox} placeholder="Student Id" value={this.state.scannedstudentId}/>

                        <TouchableOpacity style={styles.scanButton} onPress={() => {
                            this.getCameraPermission("StudentId")
                        }}>
                           <Text style={styles.buttonText}> scan
                        </Text> 
                        </TouchableOpacity>
                </View>

                </View >
            );

        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
      },
      inputView:{
        flexDirection: 'row',
        margin: 20
      },
      inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
      }
    });
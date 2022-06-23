import React from 'react';
import { View, TextInput, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundImage from '../assets/background-image.png'

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            backgroundColor: this.colors.gray,
        };
    };

    changeBgColor = (newColor) => {
        this.setState({ backgroundColor: newColor });
    }

    colors = {
        black: '#090C08',
        purple: '#474056',
        blue: '#8A95A5',
        green: '#B9C6AE'
    }


    render() {

        return (
            <View style={styles.container}>
                {/* sets background image */}
                <ImageBackground styles={styles.image} source={BackgroundImage}>


                    <View style={styles.titleContainer}>
                        <Text style={styles.appTitle}>
                            ChitChat
                        </Text>
                    </View>


                    <View style={styles.mainBox}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder='Your Name'
                            />
                        </View>


                        <View style={styles.colorSelection}>
                            <Text style={styles.colorSelectionText}>
                                Choose Background Color:
                            </Text>
                        </View>

                        <View style={styles.colorChart}>

                            <TouchableOpacity
                                style={styles.colorButton1}
                                onPress={() => this.changeBgColor(this.colors.black)}
                            />

                            <TouchableOpacity
                                style={styles.colorButton2}
                                onPress={() => this.changeBgColor(this.colors.purple)}
                            />

                            <TouchableOpacity
                                style={styles.colorButton3}
                                onPress={() => this.changeBgColor(this.colors.blue)}
                            />

                            <TouchableOpacity
                                style={styles.colorButton4}
                                onPress={() => this.changeBgColor(this.colors.green)}
                            />
                        </View>


                        <TouchableOpacity
                            style={styles.chatButton}
                            title='Start Chatting'
                            onPress={() => { this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor }) }}
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </View>

        )
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        height: '100%',
        width: '100%'
    },

    titleContainer: {
        height: '40%',
        width: '88%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '15%',
    },

    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    mainBox: {
        backgroundColor: '#FFFFFF',
        height: '44%',
        width: '88%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    inputText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: .5

    },

    inputContainer: {
        flexDirection: 'row',
        marginTop: 15,
        width: '88%',
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 15,
    },

    chatButton: {
        backgroundColor: '#757083',
        width: '88%',
        height: 50,
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },

    colorSelection: {
        margin: 'auto',
        // padding: 15,
        width: '88%'
    },

    colorSelectionText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 15
    },

    colorChart: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        marginTop: 20,
        marginBottom: 40
    },

    colorButton1: {
        backgroundColor: '#090C08',
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    colorButton2: {
        backgroundColor: '#474056',
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    colorButton3: {
        backgroundColor: '#8A95A5',
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    colorButton4: {
        backgroundColor: '#B9C6AE',
        height: 50,
        width: 50,
        borderRadius: 25,
    }

});


import React from 'react';
import { View, TextInput, Text, ImageBackground, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import BackgroundImage from '../assets/background-image.png'

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: this.colors.gray,
        };
    };

    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
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
                                accessible={true}
                                accessibilityLabel="Your name"
                                accessibilityHint="Type in the name you would like to use in the chat"
                                style={styles.inputText}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder='Your Name'
                            />

                            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
                        </View>


                        <View style={styles.colorSelection}>
                            <Text style={styles.colorSelectionText}>
                                Choose Background Color:
                            </Text>
                        </View>

                        <View style={styles.colorChart}>

                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Black button"
                                accessibilityHint="Button decides the color black as your chat background color"
                                accessibilityRole="button"
                                style={styles.colorButton1}
                                onPress={() => this.changeBgColor(this.colors.black)}
                            />

                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Dark purple button"
                                accessibilityHint="Button decides the color dark purple as your chat background color"
                                accessibilityRole="button"
                                style={styles.colorButton2}
                                onPress={() => this.changeBgColor(this.colors.purple)}
                            />

                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Light blue button"
                                accessibilityHint="Button decides the color light blue as your chat background color"
                                accessibilityRole="button"
                                style={styles.colorButton3}
                                onPress={() => this.changeBgColor(this.colors.blue)}
                            />

                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Light green button"
                                accessibilityHint="Button decides the color light green as your chat background color"
                                accessibilityRole="button"
                                style={styles.colorButton4}
                                onPress={() => this.changeBgColor(this.colors.green)}
                            />
                        </View>


                        <TouchableOpacity
                            style={styles.chatButton}
                            title='Start Chatting'
                            onPress={() => { this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor }) }}
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
    box: {
        alignItems: 'center'
    },

    mainBox: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '44%',
        // width: '88%',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20

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


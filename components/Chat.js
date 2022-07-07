
import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
//local storage for react native
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// import {
//     collection,
//     onSnapshot,
//     addDoc,
//     query,
//     orderBy,
// } from 'firebase/firestore';
// import firebase from 'firebase';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
            },
            isConnected: false,
        };

        const firebaseConfig = {
            //Firestore database credentials 
            apiKey: "AIzaSyAEEJCdVco7VRpR0VGWRGt9VVE3sRl9B00",
            authDomain: "chat-app-1f134.firebaseapp.com",
            projectId: "chat-app-1f134",
            storageBucket: "chat-app-1f134.appspot.com",
            messagingSenderId: "358488520609",
            appId: "1:358488520609:web:26a283351c51be8c78bde0",
            measurementId: "G-ZNBFNX5VLM"
        };

        //connected firebase database-stores and retrieves chat messages user sends
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        };

        //reference to firestore collection "messages"
        this.referenceChatMessages = firebase.firestore().collection("messages");
    };

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }


    componentDidMount() {
        //set screen title to props.name
        let name = this.props.route.params.name;

        //sets navigation title to users name
        this.props.navigation.setOptions({ title: name });

        //finding out user's connection status
        NetInfo.fetch().then(connection => {
            // if user is online
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');
                // updates the collection
                this.unsubscribe = this.referenceChatMessages
                    .orderBy("createdAt", "desc")
                    .onSnapshot(this.onCollectionUpdate);

                // create a reference to the active user's messages
                this.referenceChatMessages = firebase.firestore().collection('messages');

                //listen to authentication events, sign in anonymously 
                this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        firebase.auth().signInAnonymously();
                    }
                    this.setState({
                        _id: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                        }
                    });
                });

                //save messages when online
                this.saveMessages();
            } else {
                // when the user is offline
                this.setState({ isConnected: false });
                console.log('offline');
                //retrieve chat from asyncstorage
                this.getMessages();
            }
        });
    }

    //adding messages to database
    addMessage() {
        const message = this.state.messages[0];

        this.referenceChatMessages.add({
            _id: message._id,
            user: this.state.user,
            uid: this.state.uid,
            text: message.text,
            createdAt: message.createdAt,
        });
    };

    // //adding new message to the collection
    // addMessage = async (message) => {
    //     await addDoc(this.referenceChatList, {
    //         _id: message._id,
    //         text: message.text || '',
    //         createdAt: message.createdAt,
    //         user: message.user,
    //         // image: message.image || null,
    //         // location: message.location || null,
    //     });
    // }

    //called when a user sends a message
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            //add messages to AsyncStorage
            this.addMessage();

            //saves messages to AsyncStorage
            this.saveMessages();
        });
    };

    //querySnapshot is a snapshot of all data currently in the collection
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        //go through each document
        querySnapshot.forEach((doc) => {
            //get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                },
            });
        });
        this.setState({
            messages: messages,
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    //disable ability to send new messages when offline
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    render() {

        //sets background color
        let bgColor = this.props.route.params.bgColor;

        return (

            <View style={{ flex: 1, backgroundColor: bgColor }}>
                <GiftedChat
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                    }}
                />
                {/*fixes out of place keyboard */}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}

            </View>

        )
    }
}

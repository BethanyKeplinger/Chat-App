
import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
//local storage for react native
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            loggedInText: "",
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

        //connected firebase database
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        };

        //reference to firestore collection "messages"
        this.referenceChatMessages = firebase.firestore().collection("messages");
    };


    componentDidMount() {
        //set screen title to props.name
        let name = this.props.route.params.name;

        //sets navigation title to users name
        this.props.navigation.setOptions({ title: name });

        //listen to authentication events, sign in anonymously
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                },
                loggedInText: "Please wait while you're being logged in",
            });

            // create a reference to the active user's messages
            this.referenceChatMessages = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
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

    // called when a user sends a message
    // onSend(messages = []) {
    //     this.setState((previousState) => ({
    //         messages: GiftedChat.append(previousState.messages, messages),
    //     }));
    // }

    //when a message is sent, save its current state into asyncStorage
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            // add messages to local AsyncStorage
            // this.addMessage();
        })
    }


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
            messages,
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        //sets background color
        let bgColor = this.props.route.params.bgColor;

        return (

            <View style={{ flex: 1, backgroundColor: bgColor }}>
                <GiftedChat
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

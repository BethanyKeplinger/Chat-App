
import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    },
                },

                //code for a system message
                {
                    _id: 2,
                    text: 'You have entered the chat',
                    createdAt: new Date(),
                    system: true,
                },

            ],
        })
    }
    // called when a user sends a message
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        //set screen title to props.name
        let name = this.props.route.params.name;

        //sets navigation title to users name
        this.props.navigation.setOptions({ title: name });

        //sets background color
        let bgColor = this.props.route.params.bgColor;

        return (

            <View style={{ flex: 1, backgroundColor: bgColor }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {/*fixes out of place keyboard */}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}

            </View>

        )
    }
}

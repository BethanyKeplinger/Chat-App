
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            backgroundColor: ''
        };
    }
    setBackgroundColor(color) {
        this.setState({ backgroundColor: color })
    }

    render() {
        //set screen title to props.name
        let name = this.props.route.params.name;

        //sets navigation title to users name
        this.props.navigation.setOptions({ title: name });

        let backgroundColor = this.props.route.params.backgroundColor

        return (

            <View style={{ backgroundColor: backgroundColor, height: '100%' }}>
                <Text>
                    Welcome: {this.state.name}
                </Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


});
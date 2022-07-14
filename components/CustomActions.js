import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useActionSheet } from '@expo/react-native-action-sheet';

import firebase from 'firebase';
import 'firebase/firestore';

const CustomActions = (props) => {
    const { showActionSheetWithOptions } = useActionSheet();

    //lets user pick an image from devices image library
    const pickImage = async () => {
        //expo permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try {
            if (status === 'granted') {
                //pick image
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images, //only images are allowed
                }).catch((error) => console.log(error));
                //canceled process
                if (!result.cancelled) {
                    const imageUrl = await uploadImage(result.uri);
                    props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((error) => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await uploadImage(result.uri);
                    props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getLocation = async () => {

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const result = await Location.getCurrentPositionAsync({})
                    .catch((error) => console.log(error)
                    );

                const longitude = JSON.stringify(result.coords.longitude);
                const altitude = JSON.stringify(result.coords.latitude);

                if (result) {
                    props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    //uploads image to firebase as a blob
    const uploadImage = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const imageNameBefore = uri.split('/');
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const ref = firebase.storage().ref().child(`images/${imageName}`);

        const snapshot = await ref.put(blob);

        blob.close();

        return await snapshot.ref.getDownloadURL();
    };



    const onActionPress = () => {
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel'
        ];

        const cancelButtonIndex = options.length - 1;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                // const { onSend } = props
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');

                        return pickImage();
                    case 1:
                        console.log('user wants to take a photo');

                        return takePhoto();
                    case 2:
                        console.log('user wants to get their location');

                        return getLocation();
                }
            },
        );
    };



    return (
        <TouchableOpacity
            accessible={true}
            accessibilityLabel='More Options'
            accessibilityHint='Lets you choose to send an image or geolocation'
            style={[styles.container]}
            onPress={onActionPress}
        >

            <View style={[styles.wrapper, props.wrapperStyle]}>
                <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
            </View>

        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },

    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },

    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    }

});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};

export default CustomActions;
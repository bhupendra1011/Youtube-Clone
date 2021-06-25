
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";

export default function VideoUploadScreen() {
    const [video, setVideo] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setVideo(result.uri);
        }
    };

    const uploadVideo = async (): Promise<string | null> => {
        if (!video) return null;
        try {
            const response = await fetch(video);
            const blob = await response.blob();
            const fileKey = `${uuidv4()}.mp4`;
            await Storage.put(fileKey, blob);
            return fileKey
        } catch (err) {
            console.log('Error uploading file:', err);
            return null;
        }


    }

    const uploadPost = async () => {
        if (!video) return;
        const fileKey = await uploadVideo();
        console.log(`File with key ${fileKey} uploaded`)


    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick a video from camera roll" onPress={pickVideo} />
            {video && <VideoPlayer videoURI={video} />}

            <Button title="Upload" onPress={uploadPost} />
        </View>
    );


}

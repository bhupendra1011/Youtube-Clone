
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function VideoUploadScreen() {
    const [video, setVideo] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [image, setImage] = useState(null);

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

    const generateThumbnail = async () => {
        if (!video) return null;
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                video,
                {
                    time: 1000,
                }
            );

            //Upload image to Cloud.
            try {
                const response = await fetch(uri);
                const blob = await response.blob();
                const fileKey = `${uuidv4()}.jpg`;
                await Storage.put(fileKey, blob);
                return fileKey
            } catch (err) {
                console.log('Error uploading file:', err);
                return null;
            }


        } catch (e) {
            console.warn("Error in Generating thumbnail");
            return null;
        }

    }

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
        const thumbnailKey = await generateThumbnail();
        console.log(`Video + Thumbnail uploaded`);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick a video from camera roll" onPress={pickVideo} />
            {video && <VideoPlayer videoURI={video} />}

            <Button title="Upload" onPress={uploadPost} />
        </View>
    );


}

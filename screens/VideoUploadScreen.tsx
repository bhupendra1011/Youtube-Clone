
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { Storage, DataStore, Auth } from "aws-amplify";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Video, User } from '../src/models';
import { useNavigation } from '@react-navigation/core';



export default function VideoUploadScreen() {
    const [video, setVideo] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState('');

    const [progress, setProgress] = useState(0);

    const navigation = useNavigation();


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
            setDuration(Math.floor(result.duration / 100)); // in seconds
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
            // progress bar width calc
            await Storage.put(fileKey, blob, {
                progressCallback: ({ loaded, total }) => { setProgress(loaded / total); }
            });
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

        // fetch current user
        const userInfo = await Auth.currentAuthenticatedUser();
        const userSub = userInfo.attributes.sub;
        const user = (await DataStore.query(User)).find(u => u.sub === userSub);
        if (!user || !fileKey || !thumbnailKey) {
            console.error("Not sufficient data to upload");
            return;
        }


        // save Video to DB :
        await DataStore.save(new Video({
            title: title,
            thumbnail: thumbnailKey,
            videoUrl: fileKey,
            duration: duration,
            likes: 0,
            views: 0,
            dislikes: 0,
            userID: user.id
        }))

        console.log(`Video + Thumbnail uploaded`);
        //for next upload
        setVideo(null);
        setDuration(0);
        setTitle('');
        setProgress(0);
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick a video from camera roll" onPress={pickVideo} />
            {video && <VideoPlayer videoURI={video} />}
            <TextInput
                placeholder="--- Video Title ---"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="grey"
                style={{
                    backgroundColor: "#010101",
                    color: "white",
                    padding: 10, flex: 1
                }}
            />
            <Button title="Upload" onPress={uploadPost} />
            <View style={{ width: `${progress * 100}%`, height: 3, backgroundColor: 'blue' }} />
        </View>
    );


}

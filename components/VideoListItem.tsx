import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { Entypo } from '@expo/vector-icons';
import { Video } from '../src/models';
import { Storage, Analytics } from "aws-amplify"


type VideoListItemProps = {
    video: Video
}

const VideoListItem = (props: VideoListItemProps) => {
    const { video } = props;

    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        //check if url is not from storage
        if (video.thumbnail.startsWith('http')) {
            setImage(video.thumbnail)
        } else {
            Storage.get(video.thumbnail).then(setImage);
        }

    }, [video])


    const minutes = Math.floor(video.duration / 60);
    const seconds = video.duration % 60;
    let viewsString = '';
    if (video.views > 1000000) {
        viewsString = (video.views / 1000000).toFixed(2) + ' m';
    }
    if (video.views > 1000) {
        viewsString = (video.views / 1000).toFixed(2) + ' k';
    }
    const navigation = useNavigation();
    const openVideoPage = () => {

        //track click on video
        Analytics.record({
            name: 'VideoListItemClick'
        })

        navigation.navigate("VideoScreen", { id: video.id })
    }
    return (
        <Pressable onPress={openVideoPage} style={styles.videoCard}>
            {/* Video Image */}
            <View>
                {/* we have saved s3 keys in video thumbnail, so need to fetch url */}
                <Image style={styles.thumbnail} source={{ uri: image }} />
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{minutes}:{seconds.toString().padStart(2, '0')}</Text>
                </View>
            </View>
            {/* Title Row */}
            <View style={styles.titleRow}>
                {/* Avatar */}
                <Image style={styles.avatar} source={{ uri: video.User?.image }} />

                {/* Middle Container : Titlle , SubTitle */}
                <View style={styles.middleContainer}>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subTitle}>{video.User?.name || 'Anonymous'} {viewsString} {video.createdAt}</Text>
                </View>

                {/* Icon Container */}
                <Entypo name="dots-three-vertical" size={18} color="white" />

            </View>
        </Pressable>
    )
}

export default VideoListItem

const styles = StyleSheet.create({
    videoCard: {
        marginVertical: 10

    },
    thumbnail: {
        width: '100%',
        aspectRatio: 16 / 9
    },

    timeContainer: {
        width: 50,
        height: 25,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        bottom: 5,
        right: 5

    },
    time: {
        color: 'white',
        fontWeight: 'bold'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    titleRow: {
        flexDirection: "row",
        padding: 10,

    },
    middleContainer: {
        marginHorizontal: 10,
        flex: 1
    },
    title: {
        color: "white",
        fontSize: 18,
        marginBottom: 5
    },
    subTitle: {
        color: "grey",
        fontSize: 16
    }


})

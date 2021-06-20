import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';


type VideoListItemProps = {
    video: {
        id: string,
        createdAt: string,
        title: string,
        thumbnail: string,
        videoUrl: string,
        duration: number,
        views: number,
        user: {
            name: string,
            image?: string
        }
    }
}

const VideoListItem = (props: VideoListItemProps) => {
    const { video } = props;
    return (
        <View style={styles.videoCard}>
            {/* Video Image */}
            <View>
                <Image style={styles.thumbnail} source={{ uri: video.thumbnail }} />
                <View style={styles.timeContainer}>
                    {/* TODO need to change */}
                    <Text style={styles.time}>{video.duration}</Text>
                </View>
            </View>
            {/* Title Row */}
            <View style={styles.titleRow}>
                {/* Avatar */}
                <Image style={styles.avatar} source={{ uri: video.user.image }} />

                {/* Middle Container : Titlle , SubTitle */}
                <View style={styles.middleContainer}>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subTitle}>{video.user.name} {video.createdAt}</Text>
                </View>

                {/* Icon Container */}
                <Entypo name="dots-three-vertical" size={18} color="white" />

            </View>
        </View>
    )
}

export default VideoListItem

const styles = StyleSheet.create({
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

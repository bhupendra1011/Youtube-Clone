import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, FlatList, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

import video from "../assets/data/video.json"
import videos from "../assets/data/videos.json"
import VideoListItem from '../components/VideoListItem';
import VideoPlayer from '../components/VideoPlayer';
import VideoComments from '../components/VideoComments';


const VideoScreen = () => {

    const commentsSheetRef = React.useRef<BottomSheet>(null);

    let viewsString = '';
    if (video.views > 1000000) {
        viewsString = (video.views / 1000000).toFixed(2) + ' m';
    }
    if (video.views > 1000) {
        viewsString = (video.views / 1000).toFixed(2) + ' k';
    }

    const openComments = () => {
        // open bottom sheet
        commentsSheetRef.current?.expand();

    }
    return (
        // TODO : remove bg color
        <View style={{ backgroundColor: "#1c1c1c", flex: 1 }}>
            {/* Video Player */}
            <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />

            <View style={{ flex: 1 }}>
                {/* Video Info */}
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.tags}>{video.tags}</Text>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subTitle}>{video.user.name} {viewsString} {video.createdAt} </Text>
                </View>

                {/* Action List */}
                <View style={styles.actionListContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.actionListItem}>
                            <AntDesign name="like1" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.likes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="dislike2" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="export" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="download" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="download" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="download" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="download" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                        <View style={styles.actionListItem}>
                            <AntDesign name="download" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>
                    </ScrollView>
                </View>
                {/* User Info */}
                <View style={styles.userInfo}>
                    <Image style={styles.avatar} source={{ uri: video.user.image }} />
                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 18 }}> {video.user.name} </Text>
                        <Text style={{ color: "lightgrey", fontSize: 18 }}> {video.user.subscribers} Subscribers </Text>
                    </View>
                    <Text style={{ color: "red", fontSize: 20, fontWeight: "bold", padding: 10 }} >Subscribe</Text>
                </View>


                {/* Comments */}
                <Pressable onPress={openComments} style={{ padding: 10, marginVertical: 10 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Comments 330</Text>
                    {/* Comment Component */}

                </Pressable>

                {/* All Comments */}
                <BottomSheet ref={commentsSheetRef} snapPoints={[0, '80%']} index={0}
                    backgroundComponent={({ style }) => <View style={[style, { backgroundColor: "grey" }]} />}
                >
                    <VideoComments />
                </BottomSheet>
            </View>

            {/* Recommended Videos */}

        </View>
    )
}

const VideoScreenWithRecommendation = () => {
    return (
        <SafeAreaView style={{ backgroundColor: "#1c1c1c", flex: 1 }}>
            <FlatList
                data={videos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <VideoListItem video={item} />}
                ListHeaderComponent={VideoScreen}
            />
        </SafeAreaView>

    )
}

// if you want to add recomendation videos as well then use BottomSheetModalProvider ,BottomSheetModal
export default VideoScreen

const styles = StyleSheet.create({
    videoPlayer: {
        width: '100%',
        aspectRatio: 16 / 9

    }, videoInfoContainer: {
        marginVertical: 10,

    },
    title: {
        color: "white",
        fontSize: 18,
        marginVertical: 10
    },
    tags: {
        color: "#0095e3",
        fontSize: 14,
        marginBottom: 5
    },
    subTitle: {
        color: "grey",
        fontSize: 16
    },
    actionListContainer: {
        marginVertical: 10

    },
    actionListItem: {
        justifyContent: 'space-around',
        width: 60,
        height: 60,
        alignItems: "center"
    },
    actionText: {
        color: "#fff"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#3d3d3d",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 10
    },

})

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, FlatList, Pressable, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

import { useRoute } from '@react-navigation/native';

//import video from "../assets/data/video.json"
import { Storage } from "aws-amplify"

import VideoListItem from '../components/VideoListItem';
import VideoPlayer from '../components/VideoPlayer';
import VideoComments from '../components/VideoComments';
import VideoComment from "../components/VideoComment";
import { Video, Comment } from '../src/models';
import { DataStore } from "aws-amplify"


const VideoScreen = () => {
    const [video, setVideo] = useState<Video | null | undefined>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const commentsSheetRef = React.useRef<BottomSheet>(null);


    const route = useRoute();
    const videoId = route.params?.id;
    const [image, setImage] = useState<string | null>(null)


    useEffect(() => {
        DataStore.query(Video, videoId).then(setVideo)
    }, [videoId])

    useEffect(() => {
        if (!video) return;
        //check if video url is not from S3 storage
        if (video?.videoUrl.startsWith('http')) {
            setVideoUrl(video.videoUrl)
        } else {
            Storage.get(video?.videoUrl).then(setVideoUrl);
        }

        //check if video thumbnail is not from S3 storage
        if (video?.thumbnail.startsWith('http')) {
            setImage(video.thumbnail)
        } else {
            Storage.get(video.thumbnail).then(setImage);
        }

    }, [video])

    useEffect(() => {
        const fetchComments = async () => {
            if (!video) {
                return;
            }

            const videoComments = (await DataStore.query(Comment)).filter(
                (comment) => comment.videoID === video.id
            );

            setComments(videoComments);
        };

        fetchComments();
    }, [video])


    if (!video) {
        return <ActivityIndicator color="white" style={{ flex: 1 }} size="large" />
    }

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
            <VideoPlayer videoURI={videoUrl} thumbnailURI={video.thumbnail} />

            <View style={{ flex: 1 }}>
                {/* Video Info */}
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.tags}>{video.tags}</Text>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subTitle}>{video.User?.name} {viewsString} {video.createdAt} </Text>
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
                    <Image style={styles.avatar} source={{ uri: video.User?.image }} />
                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 18 }}> {video.User?.name} </Text>
                        <Text style={{ color: "lightgrey", fontSize: 18 }}> {video.User?.subscribers} Subscribers </Text>
                    </View>
                    <Text style={{ color: "red", fontSize: 20, fontWeight: "bold", padding: 10 }} >Subscribe</Text>
                </View>


                {/* Comments */}
                <Pressable onPress={openComments} style={{ padding: 10, marginVertical: 10 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Comments 330</Text>
                    {/* Comment Component  1 only , rest on bottom sheet*/}
                    {comments.length > 0 && <VideoComment comment={comments[0]} />}


                </Pressable>

                {/* All Comments */}
                <BottomSheet ref={commentsSheetRef} snapPoints={[0, '80%']} index={0}
                    backgroundComponent={({ style }) => <View style={[style, { backgroundColor: "grey" }]} />}
                >
                    <VideoComments comments={comments} videoID={video.id} />
                </BottomSheet>
            </View>

            {/* Recommended Videos */}

        </View>
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

import React from 'react'
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet' // handles scrolls correctly 

import { DataStore, Auth } from "aws-amplify";

import { Comment } from '../src/models';

import VideoComment from './VideoComment'

interface VideoCommentProps {
    comments: Comment[],
    videoID: string,
}

const VideoComments = ({ comments, videoID }: VideoCommentProps) => {

    const [newComment, setNewComment] = React.useState("");

    const submitCommit = async () => {
        // get current authenticated user;
        const userInfo = await Auth.currentAuthenticatedUser();

        await DataStore.save(new Comment({
            comment: newComment,
            likes: 0,
            dislikes: 0,
            replies: 0,
            videoID,
            userID: userInfo.attributes.sub
        })
        );
        setNewComment("");

    }

    return (
        <View style={{ backgroundColor: "#141414", flex: 1 }}>
            <Text style={{ color: "white" }}>Video Comments</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <TextInput placeholder="Your thoughts?" value={newComment} onChangeText={setNewComment}
                    placeholderTextColor="grey" style={{ backgroundColor: "#010101", color: "white", padding: 10, flex: 1 }}
                />
                <Pressable onPress={submitCommit}>
                    <Feather name="send" size={24} color="white" />
                </Pressable>
            </View>
            <BottomSheetFlatList
                data={comments}
                renderItem={({ item }) => <VideoComment comment={item} />}
            />
        </View>
    )
}

export default VideoComments

const styles = StyleSheet.create({})

import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Comment } from '../src/models'
interface VideoCommentProps {
    comment: Comment
}

const VideoComment = ({ comment }: VideoCommentProps) => {
    return (
        <View style={styles.commentsSection} >
            <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: comment.User?.image }} />
            <Text style={{ color: "white", marginLeft: 10, fontSize: 14 }}> {comment.comment} </Text>
        </View>
    )
}

export default VideoComment

const styles = StyleSheet.create({
    commentsSection: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10

    }
})



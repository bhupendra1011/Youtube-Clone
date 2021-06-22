import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

interface VideoCommentProps {
    comment: {
        id: string,
        createdAt: string,
        comment: string,
        likes: number,
        replies: number,
        dislikes: number,
        user: {
            name: string,
            image: string
        }
    }
}

const VideoComment = ({ comment }: VideoCommentProps) => {
    return (
        <View style={styles.commentsSection} >
            <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: comment.user.image }} />
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



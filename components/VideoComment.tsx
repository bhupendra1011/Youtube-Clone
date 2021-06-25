import { DataStore } from 'aws-amplify'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { User } from '../src/models'
import { Comment } from '../src/models'
interface VideoCommentProps {
    comment: Comment
}

const VideoComment = ({ comment }: VideoCommentProps) => {

    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        DataStore.query(User, comment.userID as string).then(setUser)

    }, [])

    // query here to get user from comment id;


    return (
        <View style={styles.commentsSection} >
            <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: comment.User?.image }} />
            <View>
                <Text style={{ color: "white", marginLeft: 10, fontSize: 14 }}> {user?.name} </Text>
                <Text style={{ color: "white", marginLeft: 10, fontSize: 14 }}> {comment.comment} </Text>
            </View>
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



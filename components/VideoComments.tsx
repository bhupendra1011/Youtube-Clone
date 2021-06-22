import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import comments from "../assets/data/comments.json"
import { BottomSheetFlatList } from '@gorhom/bottom-sheet' // handles scrolls correctly 
import VideoComment from './VideoComment'

const VideoComments = () => {

    return (
        <View style={{ backgroundColor: "#141414", flex: 1 }}>
            <Text>Video Comments</Text>
            <BottomSheetFlatList
                data={comments}
                renderItem={({ item }) => <VideoComment comment={item} />}
            />
        </View>
    )
}

export default VideoComments

const styles = StyleSheet.create({})

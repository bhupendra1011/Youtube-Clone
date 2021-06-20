import React from 'react'
import { FlatList, View } from 'react-native'
import VideoListItem from '../components/VideoListItem';
import videos from "../assets/data/videos.json"



const HomeScreen = () => {

    return (
        <View>
            <FlatList data={videos} keyExtractor={item => item.id}
                renderItem={({ item }) => <VideoListItem video={item}
                />} />
        </View>
    )
}

export default HomeScreen



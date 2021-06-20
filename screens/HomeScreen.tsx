import React from 'react'
import { View } from 'react-native'
import VideoListItem from '../components/VideoListItem';
import videos from "../assets/data/videos.json"



const HomeScreen = () => {

    return (
        <View>
            <VideoListItem video={videos[0]} />
            <VideoListItem video={videos[1]} />
        </View>
    )
}

export default HomeScreen



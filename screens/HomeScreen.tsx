import React from 'react'
import { FlatList, View } from 'react-native'
import VideoListItem from '../components/VideoListItem';

import { DataStore } from "aws-amplify"
import { Video } from "../src/models"


const HomeScreen = () => {

    const [videos, setVideos] = React.useState<Video[]>([]);

    React.useEffect(() => {
        // fetch query
        DataStore.query(Video).then(setVideos)
    }, [])



    return (
        <View>
            <FlatList data={videos} keyExtractor={item => item.id}
                renderItem={({ item }) => <VideoListItem video={item}

                />} />
        </View>
    )
}

export default HomeScreen



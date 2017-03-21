/**
 * Created by zou on 2017/3/21.
 */
import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
} from 'react-native';


export default class NewsItem extends Component {
    render() {
        const {data} =this.props;
        return <View style={[styles.container]}>
            <Text style={styles.title}> {data.title}</Text>
            <Image source={{uri: data.images[0]}} style={styles.img}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 10,
        marginVertical: 3,
        marginHorizontal: 12,
        shadowRadius: 3,
    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        flex: 1,
    },
    img: {
        height: 80,
        width: 90,
        margin: 10
    },
});

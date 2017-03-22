/**
 * Created by zou on 2017/3/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ToastAndroid,
    Image
} from 'react-native';

export default class BannerItem extends Component {
    render() {
        const {image, title} =this.props.data;
        return <View style={styles.container}>
            <Image source={{uri: image}} style={styles.img}>
                <View style={styles.mask}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                </View>
            </Image>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        height: 200,
        flex: 1,
    },
    img: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: 10,
        fontWeight: '400',
        padding: 14,
    },
    mask: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end'
    }

});

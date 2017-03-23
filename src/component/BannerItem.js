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
    Image,
    TouchableOpacity,
} from 'react-native';
import {Actions,} from 'react-native-router-flux';

export default class BannerItem extends Component {
    _onPress() {
        const {data} =this.props;
        Actions.details({id: data.id});
    }

    render() {
        const {image, title} =this.props.data;
        return <TouchableOpacity style={styles.container} onPress={this._onPress.bind(this)}>
            <Image source={{uri: image}} style={styles.img}>
                <View style={styles.mask}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                </View>
            </Image>
        </TouchableOpacity>
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

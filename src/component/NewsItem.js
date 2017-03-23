/**
 * Created by zou on 2017/3/21.
 */
import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {Actions,} from 'react-native-router-flux';

export default class NewsItem extends Component {
    _onPress() {
        const {data} =this.props;
        Actions.details({id: data.id});
    }

    render() {
        const {data} =this.props;
        return <TouchableOpacity style={[styles.container]} onPress={this._onPress.bind(this)}>
            <Text style={styles.title}> {data.title}</Text>
            <Image source={{uri: data.image ? data.image : data.images[0]}} style={styles.img}/>
        </TouchableOpacity>
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

/**
 * Created by zou on 2017/3/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ToastAndroid
} from 'react-native';

export default class Divider extends Component {
    render() {
        return <View style={styles.item}>
        </View>
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ccc',
        height: 1
    },
});

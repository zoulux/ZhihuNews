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
import {Actions,} from 'react-native-router-flux';


export default class Splash extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            Actions.main();
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return <Image
            style={{flex: 1, height: 500}}
            source={{uri: 'http://img.hb.aicdn.com/354d5f046b30801851acc1318c2ae4dcf50b012c30649-M9weRA_fw658'}}></Image>
    }
}
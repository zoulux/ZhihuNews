/**
 * Created by zou on 2017/3/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ToastAndroid,
    Image,
} from 'react-native';
import {Scene, Router, ActionConst,} from 'react-native-router-flux';


import Splash from './pages/Splash'
import Main from './pages/Main'
import Details from './pages/Details'

export default class ZhihuNews extends Component {

    clickMainLeft(v) {
        console.log(myIcon);
    }

    render() {
        return (
            <Router key='root'>
                <Scene key='splash' component={Splash} hideNavBar hideTabBar initial/>
                <Scene key='main'
                       component={Main}
                       title="首页"
                       titleStyle={styles.titleStyle}
                       navigationBarStyle={styles.navBarStyle}
                       type={ActionConst.REPLACE}
                />
                <Scene key='details' component={Details} title="详情" titleStyle={styles.titleStyle}
                       navigationBarStyle={styles.navBarStyle}/>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    navBarStyle: {
        backgroundColor: '#00a2ed',
    },
    titleStyle: {
        color: 'white',
    }
});



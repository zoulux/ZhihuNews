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
import {Scene, Router, ActionConst,} from 'react-native-router-flux';

import Splash from './pages/Splash'
import Main from './pages/Main'
import Details from './pages/Details'


export default class ZhihuNews extends Component {
    render() {
        return (
            <Router key='root'>
                <Scene key='splash' component={Splash} hideNavBar hideTabBar initial/>
                <Scene key='main' component={Main} type={ActionConst.REPLACE} title="首页"/>
                <Scene key='details' component={Details}  title="详情"/>
            </Router>
        )
    }
}



/**
 * Created by zou on 2017/3/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';
import ViewPager from 'react-native-viewpager';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: 'loading',
            css: '',
        }
    }


    componentDidMount() {
        const {id} =this.props;
        fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                        body: jsonResponse.body,
                        css: jsonResponse.css[0],
                    }
                )
            })
            .catch(e => {
                alert(e)
            })
    }

    render() {
        let html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
            + this.state.css
            + '" /></head><body>' + this.state.body
            + '</body></html>';
        return <WebView source={{html: html}}>
        </WebView>
    }

    //
    // render() {
    //     let uri = `http://daily.zhihu.com/story/${this.props.id}`
    //     return <WebView source={{uri: uri}}
    //                     startInLoadingState
    //                     domStorageEnabled
    //                     javaScriptEnabled
    //     >
    //     </WebView>
    // }
}
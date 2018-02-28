
import React from 'react';
import { connect } from 'dva'; 
import { Form, Row, Col } from 'antd';
import styles from './index.less'; 

@Form.create() 
@connect(({ loading }) => ({ 
    loading: false,
}))
export default class Footer6 extends React.Component {
    componentDidMount() {
        // this.props.dispatch({
        //     type: 'list/fetch',
        //     payload: {
        //         count: 5,
        //     },
        // });
    } 
    componentWillReceiveProps(nextProps) { 
    }
	render() {
        return (
            <div>Footer6 Component</div>
        )
    }
} 

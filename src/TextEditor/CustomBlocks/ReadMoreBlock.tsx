import React from 'react';
import styles from './ReadMoreBlock.module.scss'
const ReadMoreBlock : React.FC<any> = (props) => {

    return (
        <div className={styles.ReadMoreBlock} 
        onClick={props.onClickHandler}>
            {/* here, this.props.children contains a <a> container, as that was the matching element */}
            {props.children}
        </div>
    )
}

export default ReadMoreBlock
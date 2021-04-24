import React from 'react'
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import '@draft-js-plugins/linkify/lib/plugin.css'
import styles from '../DraftTextEditor.module.scss'

export const linkifyPlugin = createLinkifyPlugin({
    component(props) {
        return <a {...props} className={`${styles.linkifyPlugin}`} target="_blank" />;
    },
});

export const linkifyDecorators = linkifyPlugin.decorators;
import React from 'react';
import { SubMentionComponentProps } from '@draft-js-plugins/mention/lib/Mention';
import {defaultTheme} from '@draft-js-plugins/mention';
import createMentionPlugin from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';

import styles from './MentionPlugins.module.scss';


export const MentionPlugin = (_mentionPrefix: string, _mentionTrigger: string, _entry: (mentionProps: React.PropsWithChildren<SubMentionComponentProps>) => React.ReactElement, _supportWhitespace: boolean = true) => createMentionPlugin({
  mentionComponent(mentionProps) {
    return (
      _entry(mentionProps)
    );
  },
  mentionPrefix: _mentionPrefix,
  mentionTrigger: _mentionTrigger,
  supportWhitespace: _supportWhitespace,
  theme: {
    ...defaultTheme,
    mentionSuggestionsPopup: `${defaultTheme.mentionSuggestionsPopup} ${styles.MentionPlugin_Container} ${styles.Style_mentionSuggestions}`
  }
});

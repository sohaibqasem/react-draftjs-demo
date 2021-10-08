import React from 'react';
import { MentionPlugin } from './MentionPluginBase';
import styles from './MentionPlugins.module.scss';
export const MentionMyNetworkPlugin = (_isEditMode: boolean = false) => MentionPlugin("", "@", (mentionProps) => {
    return (
        _isEditMode === true ?
            <span
                title={mentionProps.mention.name}
                className={styles.MentionMyNetworkPlugin_tag}
            >
                {mentionProps.children}
            </span>
            :
            <a
                href={"#"}
                title={mentionProps.mention.name}
                className={styles.MentionMyNetworkPlugin_tag}
            >
                {mentionProps.children}
            </a>
    );
});

export const MentionMyNetworkDecorators = MentionMyNetworkPlugin().decorators;

// export const MyNetworkEntry = (props: EntryComponentProps): React.ReactElement => {
//     const {
//         mention,
//         theme,
//         searchValue,
//         isFocused,
//         ...parentProps
//     } = props;

//     return (
//         <div {...parentProps}>
//             <div className={`${theme?.mentionSuggestionsEntryContainer} ${styles.MentionMyNetworkPlugin_Container} pb-2`} title={mention.name}>
//                 <span className={`${theme?.mentionSuggestionsEntryContainerLeft} ${styles.MentionMyNetworkPlugin_ImgContainer}`}>
//                     <img
//                         src={profilePic100(mention.profileImg)}
//                         className={`${theme?.mentionSuggestionsEntryAvatar} ${styles.MentionMyNetworkPlugin_Img}`}
//                         role="presentation"
//                     />
//                 </span>
//                 {
//                     mention.title ?
//                         <>
//                             <span className={`${theme?.mentionSuggestionsEntryContainerRight} ps-5`}>
//                                 <span className={`d-inline-block text-truncate fs-small ${styles.MentionPlugin_EntityName}`}>
//                                     {mention.name}
//                                 </span>
//                             </span>
//                             <div className={`ps-5 fs-xsmall text-muted`}>
//                                 {mention.title}
//                             </div>
//                         </>
//                         :
//                         <>
//                             <span className={`${theme?.mentionSuggestionsEntryContainerRight} ${styles.MentionMyNetworkPlugin_EntryNameContainer} ps-5`}>
//                                 <p className={`d-inline-block text-truncate fs-small ${styles.MentionPlugin_EntityName}`}>
//                                     {mention.name}
//                                 </p>
//                             </span>
//                         </>
//                 }
//             </div>
//         </div>
//     );
// }

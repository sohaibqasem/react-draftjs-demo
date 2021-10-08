import React from 'react';
import _ from 'lodash';
import mentions from '../../Utils/mentions';

import { MentionMyNetworkPlugin } from '../../TextEditor/DraftPlugins/MentionPlugins/MentionMyNetworkPlugin';
import { defaultSuggestionsFilter } from '@draft-js-plugins/mention';


const MentionMyNetworks : React.FC<any> = (MyNetworkSuggestionsComponent) => {
    const [myNetworkOpenDropDown, setMyNetworkOpenDropDown] = React.useState<boolean>(false);
    const [myNetworkSuggestions, setMyNetworkSuggestions] = React.useState<any[]>(mentions);

    const onMyNetworkOpenChange = React.useCallback((_open: boolean) => {
        setMyNetworkOpenDropDown(_open);
    }, []);

    const onMyNetworkSearchChange = React.useCallback(({ trigger, value }: { trigger: string; value: string }) => {
        setMyNetworkSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);

    return (
            <MyNetworkSuggestionsComponent
                open={myNetworkOpenDropDown}
                onOpenChange={onMyNetworkOpenChange}
                suggestions={myNetworkSuggestions}
                onSearchChange={onMyNetworkSearchChange}
                onAddMention={() => {
                    setMyNetworkSuggestions([]);
                }}
            />
    )
};

export default MentionMyNetworks;


export const MyNetworkMentionPlugin = (_editMode: boolean) => {

    const { MyNetworkSuggestions, MyNetworkPlugin, MyNetworkDecorators } = React.useMemo(() => {
        const MyNetworkPlugin = MentionMyNetworkPlugin(_editMode);
        const MyNetworkSuggestions = MyNetworkPlugin.MentionSuggestions;
        const MyNetworkDecorators = MyNetworkPlugin.decorators;
        return { MyNetworkPlugin, MyNetworkSuggestions, MyNetworkDecorators };
    }, []);

    return ({
        MyNetworkSuggestions, MyNetworkPlugin, MyNetworkDecorators
    })
};


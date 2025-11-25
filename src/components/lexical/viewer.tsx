'use client';

import {InitialConfigType, LexicalComposer} from '@lexical/react/LexicalComposer';
import {SerializedEditorState} from 'lexical';

import {editorTheme} from '@/components/editor/themes/editor-theme';

import {nodes} from './nodes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Plugins } from './plugins';

const viewerConfig: InitialConfigType = {
    namespace: 'Viewer',
    theme: editorTheme,
    nodes,
    editable: false,
    onError: (error: Error) => {
        console.error(error);
    },
};

export function Viewer({editorState}: { editorState: string }) {
    // Parse the JSON string to get the serialized editor state
    let serializedState: SerializedEditorState | undefined;
    try {
        serializedState = JSON.parse(editorState);
    } catch (error) {
        console.error('Failed to parse editor state:', error, 'Editor state:', editorState);
    }

    return (
        <div className="bg-background overflow-hidden rounded-lg border shadow">
            <LexicalComposer
                initialConfig={{
                    ...viewerConfig,
                    ...(serializedState ? {editorState: JSON.stringify(serializedState)} : {}),
                }}
            >
                <TooltipProvider>
                    <Plugins/>
                </TooltipProvider>
            </LexicalComposer>
        </div>
    );
}

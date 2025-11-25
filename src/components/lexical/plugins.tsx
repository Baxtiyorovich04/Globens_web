
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'

import { CodeHighlightPlugin } from '@/components/editor/plugins/code-highlight-plugin'
import { CollapsiblePlugin } from '@/components/editor/plugins/collapsible-plugin'
import { FigmaPlugin } from '@/components/editor/plugins/embeds/figma-plugin'
import { TwitterPlugin } from '@/components/editor/plugins/embeds/twitter-plugin'
import { YouTubePlugin } from '@/components/editor/plugins/embeds/youtube-plugin'
import { EmojisPlugin } from '@/components/editor/plugins/emojis-plugin'
import { EquationsPlugin } from '@/components/editor/plugins/equations-plugin'
import { ExcalidrawPlugin } from '@/components/editor/plugins/excalidraw-plugin'
import { ImagesPlugin } from '@/components/editor/plugins/images-plugin'
import { InlineImagePlugin } from '@/components/editor/plugins/inline-image-plugin'
import { KeywordsPlugin } from '@/components/editor/plugins/keywords-plugin'
import { LayoutPlugin } from '@/components/editor/plugins/layout-plugin'
import { LinkPlugin } from '@/components/editor/plugins/link-plugin'
import { PageBreakPlugin } from '@/components/editor/plugins/page-break-plugin'
import { PollPlugin } from '@/components/editor/plugins/poll-plugin'
import { ContentEditable } from '@/components/editor/editor-ui/content-editable'

export function Plugins() {

  return (
    <div className="relative">
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="">
                <ContentEditable
                    className='ContentEditable__root relative block min-h-72 overflow-auto min-h-full px-8 py-4 focus:outline-none'
                    placeholder={''} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <HashtagPlugin />

        <KeywordsPlugin />
        <EmojisPlugin />
        <ImagesPlugin />
        <InlineImagePlugin />
        <ExcalidrawPlugin />
        <PollPlugin />
        <LayoutPlugin />
        <EquationsPlugin />
        <CollapsiblePlugin />
        <PageBreakPlugin />

        <FigmaPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <CodeHighlightPlugin />
        <LinkPlugin />
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { createLowlight } from 'lowlight';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Separator } from './separator';
import { cn } from '@/lib/utils';
import {
  RxFontBold,
  RxFontItalic,
  RxUnderline,
  RxStrikethrough,
  RxTextAlignLeft,
  RxTextAlignCenter,
  RxTextAlignRight,
  RxTextAlignJustify,
  RxQuote,
  RxLetterCaseCapitalize,
  RxMinus,
  RxChevronDown,
  RxCheck,
} from 'react-icons/rx';
import { HiNumberedList, HiListBullet } from "react-icons/hi2";
import { MdOutlineOpenInNew } from 'react-icons/md';
import { RiLink } from "react-icons/ri";
import { MdFormatColorText } from 'react-icons/md';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import { Input } from './input';
import { CheckIcon } from 'lucide-react';
import Link from '@tiptap/extension-link';
import { TbClearFormatting } from 'react-icons/tb';

// Import languages for syntax highlighting
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

const lowlight = createLowlight();
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);
lowlight.register('css', css);
lowlight.register('html', html);

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

export function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Write something...',
  className,
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Underline,
      Subscript,
      Superscript,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        HTMLAttributes: {
          target: null,
          rel: null,
        },
        openOnClick: false,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'focus:outline-none min-h-[200px] p-4',
          className
        ),
      },
    },
  });

  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [bubbleLinkUrl, setBubbleLinkUrl] = useState('');
  const [bubbleMenuVisible, setBubbleMenuVisible] = useState(false);
  const COLORS = [
    '#000', '#2563eb', '#0ea5e9', '#0891b2', '#ea580c', '#dc2626', '#7c3aed',
    '#64748b', '#3b82f6', '#38bdf8', '#2dd4bf', '#f59e42', '#f87171', '#a78bfa',
    '#94a3b8', '#60a5fa', '#67e8f9', '#5eead4', '#fde68a', '#fca5a5', '#c4b5fd',
  ];
  const currentColor = editor && editor.getAttributes('textStyle').color;

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input rounded-md">
      {editable && (
        <div className="border-b border-input p-2 flex flex-wrap items-center gap-1">
          {/* Text Format Dropdown */}
          <div className="flex items-center gap-0.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 gap-1"
                  type="button"
                >
                  <RxLetterCaseCapitalize className="h-4 w-4 mr-1" />
                  <RxChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  <span className="flex items-center gap-2">
                    Normal Text
                    {!editor.isActive('heading') && <RxCheck className="h-3 w-3" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                  <span className="flex items-center gap-2">
                    <div className='text-2xl font-bold'>
                    Heading 1
                    </div>
                    {editor.isActive('heading', { level: 1 }) && <RxCheck className="h-3 w-3" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                  <span className="flex items-center gap-2">
                    <div className='text-xl font-bold'>
                    Heading 2
                    </div>
                    {editor.isActive('heading', { level: 2 }) && <RxCheck className="h-3 w-3" />}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                  <span className="flex items-center gap-2">
                    <div className='text-lg font-bold'>
                    Heading 3
                    </div>
                    {editor.isActive('heading', { level: 3 }) && <RxCheck className="h-3 w-3" />}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="shrink-0 bg-border w-[1px] mx-2 h-7" />

          {/* Text formatting */}
          <div className="flex items-center gap-0.5">
            <Button
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleBold().run()}
              type="button"
              title="Bold"
            >
              <RxFontBold className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              type="button"
              title="Italic"
            >
              <RxFontItalic className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive('underline') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              type="button"
              title="Underline"
            >
              <RxUnderline className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive('strike') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              type="button"
              title="Strikethrough"
            >
              <RxStrikethrough className="h-4 w-4" />
            </Button>
            {/* Color Picker Popover */}
            <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  size="sm"
                  className="flex items-center gap-0.5"
                  type="button"
                  title="Text Color"
                  onClick={() => setColorPopoverOpen(true)}
                >
                  <MdFormatColorText className="h-4 w-4" />
                  <RxChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <div className="grid grid-cols-7 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-7 h-7 rounded-md flex items-center justify-center border-2 transition-colors ${currentColor === color ? 'border-black' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        setColorPopoverOpen(false);
                      }}
                    >
                      {currentColor === color && <CheckIcon className="w-4 h-4 text-white drop-shadow" />}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="shrink-0 bg-border w-[1px] mx-2 h-7" />

          {/* Text alignment */}
          <div className="flex items-center gap-0.5">
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              type="button"
              title="Align Left"
            >
              <RxTextAlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              type="button"
              title="Align Center"
            >
              <RxTextAlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              type="button"
              title="Align Right"
            >
              <RxTextAlignRight className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              type="button"
              title="Align Justify"
            >
              <RxTextAlignJustify className="h-4 w-4" />
            </Button>
          </div>

          <div className="shrink-0 bg-border w-[1px] mx-2 h-7" />

          {/* Lists */}
          <div className="flex items-center gap-0.5">
            <Button
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              type="button"
              title="Bullet List"
            >
              <HiListBullet className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              type="button"
              title="Numbered List"
            >
              <HiNumberedList className="h-4 w-4" />
            </Button>
          </div>

          <div className="shrink-0 bg-border w-[1px] mx-2 h-7" />

          {/* Other formatting */}
          <div className="flex items-center gap-0.5">
            <Button
              variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              type="button"
              title="Quote"
            >
              <RxQuote className="h-4 w-4" />
            </Button>
            {/* Divider (Horizontal Rule) */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              type="button"
              title="Divider"
            >
              <RxMinus className="h-4 w-4" />
            </Button>
            {/* Link */}
            <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={editor.isActive('link') ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  type="button"
                  title="Link"
                  onClick={() => {
                    setLinkUrl('');
                    setLinkPopoverOpen(true);
                  }}
                >
                  <RiLink className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2 flex flex-col gap-2">
                <Input
                  placeholder="Paste or type a link..."
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      editor.chain().focus().setMark('link', { href: linkUrl }).run();
                      setLinkPopoverOpen(false);
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    editor.chain().focus().setMark('link', { href: linkUrl }).run();
                    setLinkPopoverOpen(false);
                  }}
                  disabled={!linkUrl}
                >
                  Apply
                </Button>
              </PopoverContent>
            </Popover>
          </div>

          <div className="shrink-0 bg-border w-[1px] mx-2 h-7" />
          {/* Clear Formatting Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            type="button"
            title="Clear Formatting"
          >
            <TbClearFormatting className="h-4 w-4" />
        </Button>
        </div>
      )}

      {/* BubbleMenu for link editing */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, onShow: () => setBubbleMenuVisible(true), onHide: () => setBubbleMenuVisible(false) }}
          shouldShow={({ editor }) => editor.isActive('link')}
          className="z-50"
        >
          {(() => {
            useEffect(() => {
              if (bubbleMenuVisible && editor.isActive('link')) {
                setBubbleLinkUrl(editor.getAttributes('link').href || '');
              }
            }, [bubbleMenuVisible, editor]);
            return null;
          })()}
          <div className="flex flex-col gap-2 bg-white border border-input rounded-md shadow-lg p-3 min-w-[220px]">
            <Input
              value={bubbleLinkUrl}
              onChange={e => {
                setBubbleLinkUrl(e.target.value);
                editor.chain().focus().extendMarkRange('link').setLink({ href: e.target.value }).run();
              }}
              placeholder="Edit link..."
              className="mb-2"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => {
                  const href = editor.getAttributes('link').href;
                  if (href) {
                    if (navigator.clipboard && window.isSecureContext) {
                      navigator.clipboard.writeText(href);
                    } else {
                      // fallback for insecure context or older browsers
                      const textArea = document.createElement('textarea');
                      textArea.value = href;
                      document.body.appendChild(textArea);
                      textArea.focus();
                      textArea.select();
                      try {
                        document.execCommand('copy');
                      } catch (err) {}
                      document.body.removeChild(textArea);
                    }
                  }
                }}
                disabled={!editor.getAttributes('link').href}
                title="Copy link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2zm0 0v2a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </Button>
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => {
                  editor.chain().focus().extendMarkRange('link').unsetLink().run();
                }}
                title="Remove link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </Button>
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => {
                  const href = editor.getAttributes('link').href;
                  if (href) window.open(href, '_blank');
                }}
                disabled={!editor.getAttributes('link').href}
                title="Open in new tab"
              >
                <MdOutlineOpenInNew className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        className={cn(
          "min-h-[200px]",
          !editable && "cursor-default"
        )}
      />
    </div>
  );
}

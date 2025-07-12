import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { FormatAction } from "../../types"
import type { toggleVariants } from "@/components/ui/toggle"
import type { VariantProps } from "class-variance-authority"
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
} from "@radix-ui/react-icons"
import { ToolbarSection } from "../toolbar-section"

type TextAlignAction = "left" | "center" | "right" | "justify"

interface TextAlign extends FormatAction {
  value: TextAlignAction
}

const formatActions: TextAlign[] = [
  {
    value: "left",
    label: "Align left",
    icon: <TextAlignLeftIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
    canExecute: (editor) => editor.can().setTextAlign("left"),
    shortcuts: ["mod", "shift", "L"],
  },
  {
    value: "center",
    label: "Align center",
    icon: <TextAlignCenterIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
    canExecute: (editor) => editor.can().setTextAlign("center"),
    shortcuts: ["mod", "shift", "E"],
  },
  {
    value: "right",
    label: "Align right",
    icon: <TextAlignRightIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
    canExecute: (editor) => editor.can().setTextAlign("right"),
    shortcuts: ["mod", "shift", "R"],
  },
  {
    value: "justify",
    label: "Justify",
    icon: <TextAlignJustifyIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("justify").run(),
    isActive: (editor) => editor.isActive({ textAlign: "justify" }),
    canExecute: (editor) => editor.can().setTextAlign("justify"),
    shortcuts: ["mod", "shift", "J"],
  },
]

interface SectionThreeProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: TextAlignAction[]
  mainActionCount?: number
}

export const SectionThree: React.FC<SectionThreeProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 4,
  size,
  variant,
}) => {
  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={activeActions}
      mainActionCount={mainActionCount}
      size={size}
      variant={variant}
    />
  )
}

SectionThree.displayName = "SectionThree"

export default SectionThree

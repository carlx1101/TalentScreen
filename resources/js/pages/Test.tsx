import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";

export default function Test() {
  const [value, setValue] = useState<Content>('');

    return <TooltipProvider>
      <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-hidden"
    />
    </TooltipProvider>;
}

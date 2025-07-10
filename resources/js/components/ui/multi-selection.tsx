import React from "react";
import { Check, ChevronsUpDown, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommandEmpty } from "@/components/ui/command";

type MultiSelectionProps = {
	value?: string[];
	options: {
		label: string;
		value: string;
	}[];
	onValueSelected: (selection?: string[]) => void;
	isLoading?: boolean;
};

export function MultiSelection({ onValueSelected, value, options, isLoading }: MultiSelectionProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [openCombobox, setOpenCombobox] = React.useState(false);
	const [inputValue, setInputValue] = React.useState<string>("");

	// Convert string values to option objects for internal use
	const selectedOptions = React.useMemo(() => {
		if (!value || !options) return [];
		return options.filter(option => value.includes(option.value));
	}, [value, options]);

	const toggleOption = React.useCallback((option: MultiSelectionProps["options"][number]) => {
		const isSelected = selectedOptions.some(selected => selected.value === option.value);
		const newSelection = isSelected
			? selectedOptions.filter(selected => selected.value !== option.value)
			: [...selectedOptions, option];

		onValueSelected(newSelection.map(opt => opt.value));
		inputRef?.current?.focus();
	}, [selectedOptions, onValueSelected]);

	const onComboboxOpenChange = React.useCallback((value: boolean) => {
		inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
		setOpenCombobox(value);
	}, []);

	// Check if input value represents a new option

	return (
		<div className="w-full">
			<Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openCombobox}
						disabled={isLoading}
						className="w-full justify-between text-foreground"
					>
						{isLoading ? (
							<div className="flex items-center">
								<LoaderIcon className="animate-spin mr-2 h-4 w-4" />
								<span>Loading...</span>
							</div>
						) : (
							<span className="truncate">
								{selectedOptions.length === 0 && "Select options"}
								{selectedOptions.length === 1 && selectedOptions[0].label}
								{selectedOptions.length === 2 &&
									selectedOptions.map(({ label }) => label).join(", ")}
								{selectedOptions.length > 2 &&
									`${selectedOptions.length} options selected`}
							</span>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
					<Command loop>
						<CommandInput
							ref={inputRef}
							placeholder="Search options..."
							value={inputValue}
							onValueChange={setInputValue}
						/>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup className="max-h-[145px] overflow-auto">
								{options?.map((option) => {
										const isActive = selectedOptions.some(selected => selected.value === option.value);
										return (
											<CommandItem
												key={option.value}
												value={option.value}
												onSelect={() => toggleOption(option)}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														isActive ? "opacity-100" : "opacity-0",
													)}
												/>
												<div className="flex-1">{option.label}</div>
											</CommandItem>
										);
									})}
              </CommandGroup>
						</CommandList>
						{/* Footer for Clear | Close */}
						<div className="border-t flex items-center justify-between px-4 py-2 bg-background">
							{selectedOptions.length > 0 ? (
								<>
									<Button
										variant="ghost"
										size="sm"
										className="flex-1"
										onClick={() => onValueSelected([])}
									>
										Clear
									</Button>
									<div className="w-px h-6 bg-muted-foreground/30 mx-2" />
									<Button
										variant="ghost"
										size="sm"
										className="flex-1"
										onClick={() => setOpenCombobox(false)}
									>
										Close
									</Button>
								</>
							) : (
								<Button
									variant="ghost"
									size="sm"
									className="w-full"
									onClick={() => setOpenCombobox(false)}
								>
									Close
								</Button>
							)}
						</div>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

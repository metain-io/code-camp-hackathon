declare namespace CheckBox_Component {
	export interface Props {
		theme?: string;
		className?: string;
		value?: boolean;
		width?: string;
		textArray?: string[];
		disabled?: boolean;
		children?: React.ReactNode;
		dataset?: {
			[key in string]: any;
		};
		C_onChange?: (value: boolean, $dom: HTMLDivElement | null) => void;
	}
}

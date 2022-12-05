declare namespace Anchor_Component {
	export interface Props {
		theme?: string;
		className?: string;
		href: string;
		onClickHandler?: (e: any) => void
		children?: React.ReactNode;
		disabled?: boolean;
		isOpenNewTab?: boolean;
	}
}

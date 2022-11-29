declare namespace Content_Component {
	export interface Props {
		revertRightColumn?: boolean;
		hasRightColumn?: boolean;
		rightColumnComponent?: string;
		breadcrumb?: React.ReactNode;
		rightColumnContent?: React.ReactNode;
		children?: React.ReactNode;
	}
}

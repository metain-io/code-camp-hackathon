declare namespace AdminLayout_View {
	export interface Props {
		revertRightColumn?: boolean;
		hasRightColumn?: boolean;
		rightColumnComponent?: string;
		breadcrumb?: React.ReactNode;
		rightColumnContent?: React.ReactNode;
		children: React.ReactNode;
	}

	export interface SimpleLineChart {
		value: number;
		change_percentage_24h: number;
		data: number[];
	}
}

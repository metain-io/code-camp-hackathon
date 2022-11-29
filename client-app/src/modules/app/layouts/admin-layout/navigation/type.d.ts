declare namespace Navigation_Component {
	export interface Group {
		title: string;
		children: Action[];
	}

	export interface Action {
        disabled: boolean;
        tooltips: {
			content: any;
		};
		name: string;
		icon: string;
		url: string;
		className?: string;
	}
}

export declare namespace Table_Component {
	import { NFTActionEnum } from '@Libraries/hooks/Crypto';

	export interface Props {
		theme?: string;
		className?: string;
		columnArray: {
			value: string;
			label: string;
			postFix?: JSX.Element;
			customRender?: (value: any) => void;
		}[];
		tableArray: NFT_Row[] | Row[];
		mobileLayout?: boolean;
		C_onClick?: (value: any) => void;
		C_onButtonClick?: (value: any) => void;
		emptyDataMessage?: string;
	}

	export interface Row {
		name: string;
		symbol: string;
		current_price: number;
		market_cap?: number;
		total_volume?: number;
		price_change_24h?: number;
		price_change_percentage_24h?: number;
		chart_data?: any;
		amount?: string;
	}

	export interface NFT_Row {
		id: string;
		vot_name: string;
		available: string;
		value: string;
		holding: string;
		date: string;
		actions: NFTActionEnum;
	}

	export interface AdressBook_Row {
		displayName: string;
		asset: string;
		network: string;
		origin: string;
		address: string;
	}

	export interface PreOrder_Row {
		order_id: string;
		account_id: string;
		date: string;
		detail: string;
		bonus: number;
		deposit: number;
		status: string;
	}

	export interface WheelFortune_Row {
		count: number;
		username?: string;
		status: string;
		type: string;
		name: string;
	}
}

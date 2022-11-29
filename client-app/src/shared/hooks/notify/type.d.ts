declare namespace Notify_Hook {
	import { TypeOptions } from "react-toastify";

	export interface Alert {
		status?: string;
		title?: string;
		message?: string;
	}

	export interface Confirm {
		title?: string;
		message?: string;
		C_confirm?: () => void;
		C_cancel?: () => void;
	}

	export interface Toast {
		status?: TypeOptions | undefined;
		title?: string;
		message?: string;
		duration?: number;
	}
}

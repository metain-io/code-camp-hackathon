import React from "react";
import useNotify from "../notify";

const useHelper = () => {
	/* Props **************************************************************************************************************************************************/

	/* Stores *************************************************************************************************************************************************/

	/* Hooks **************************************************************************************************************************************************/
	const { showToast } = useNotify();

	/* Variables **********************************************************************************************************************************************/

	/* Functions **********************************************************************************************************************************************/
	function F_copyToClipboard(content: string, willShowToast?: boolean) {
		navigator.clipboard.writeText(content);

		if (willShowToast) {
			showToast({
				status: "success",
				message: 'Copied',
			});
		}
	}

	function F_loadingScreen(active: boolean) {
		if (active) {
			document.getElementById("loading_backdrop")!.classList.add("active");
			document.getElementById("loading_backdrop")!.classList.add("mLoading");
			document.addEventListener("click", E_removeAllEvents, true);
		} else {
			document.getElementById("loading_backdrop")!.classList.remove("active");
			document.getElementById("loading_backdrop")!.classList.remove("mLoading");
			document.removeEventListener("click", E_removeAllEvents, true);
		}
	}

	/* Events *************************************************************************************************************************************************/
	const E_removeAllEvents = React.useCallback((event: any) => {
		event.stopPropagation();
		event.preventDefault();
	}, []);

	/* Return Value *******************************************************************************************************************************************/
	return {
		copyToClipboard: F_copyToClipboard,
		loadingScreen: F_loadingScreen,
	};
};

export default useHelper;

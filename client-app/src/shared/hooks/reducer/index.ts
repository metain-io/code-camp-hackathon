import React from "react";

const useReducer = (initInstance: any) => {
	/* Props **************************************************************************************************************************************************/

	/* Stores *************************************************************************************************************************************************/

	/* Hooks **************************************************************************************************************************************************/
	const [instance, dispatchInstance] = React.useReducer(F_reducerInstance, initInstance);

	/* Variables **********************************************************************************************************************************************/

	/* Life Circle ********************************************************************************************************************************************/

	/* Api ****************************************************************************************************************************************************/

	/* Functions **********************************************************************************************************************************************/
	function F_reducerInstance(instance: any, action: Reducer_Hook.Value) {
		const { value = null, column = null, field = null, key = null } = action;

		if (value !== null && column !== null && field !== null && key !== null) {
			return {
				...instance,
				[column]: {
					...instance[column],
					[field]: {
						...instance[field],
						[key]: value,
					},
				},
			};
		}

		if (value !== null && column !== null && field !== null) {
			return {
				...instance,
				[column]: {
					...instance[column],
					[field]: value,
				},
			};
		}

		if (value !== null && column !== null) {
			return {
				...instance,
				[column]: value,
			};
		}

		return {
			...instance,
			...value,
		};
	}

	function F_changeInstance(value?: any, column?: string, field?: string, key?: string) {
		dispatchInstance({
			value: value,
			column: column,
			field: field,
			key: key,
		});
	}

	function F_resetInstance() {
		F_changeInstance(initInstance);
	}

	/* Events *************************************************************************************************************************************************/

	/* Components *********************************************************************************************************************************************/

	/* Return Value *******************************************************************************************************************************************/
	return [instance, F_changeInstance, F_resetInstance];
};

export default useReducer;

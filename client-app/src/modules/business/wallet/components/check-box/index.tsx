import React from "react";
import styles from "./style.module.scss";

const CheckBox = (props: CheckBox_Component.Props) => {
	/* Props **************************************************************************************************************************************************/
	const {
		theme = "normal",
		className = "",
		value = false,
		width = "17rem",
		textArray = ["", ""],
		disabled = false,
		dataset = {},
		C_onChange = () => {},
	} = props;

	/* Stores *************************************************************************************************************************************************/

	/* Hooks **************************************************************************************************************************************************/
	const componentRef = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [S_value, S_changeValue] = React.useState(value);

	/* Variables **********************************************************************************************************************************************/

	/* Life Circle ********************************************************************************************************************************************/
	React.useEffect(() => {
		if (props.value !== undefined && props.value !== S_value) {
			S_changeValue(props.value);
		}
	}, [props.value]);

	/* Api ****************************************************************************************************************************************************/

	/* Functions **********************************************************************************************************************************************/
	function checkText(value: string) {
		if (value.indexOf("fm-") !== -1) {
			return <i className={value}></i>;
		} else {
			return <span className={styles.span_1}>{value}</span>;
		}
	}

	/* Events *************************************************************************************************************************************************/
	function E_change(event: React.ChangeEvent<HTMLInputElement>) {
		let inputValue = event.target.checked;

		S_changeValue(inputValue);
		C_onChange(inputValue, componentRef.current);
	}

	/* Components *********************************************************************************************************************************************/
	const CheckBoxComponent = () => {
		return <input ref={inputRef} type="checkbox" className={styles.input_1} checked={S_value} disabled={disabled} onChange={E_change} />;
	};

	/* Render *************************************************************************************************************************************************/
	const ConditionalRender = () => {
		switch (theme) {
			case "normal":
				return (
					<label className={styles.label_1}>
						{CheckBoxComponent()}
						<div className={styles.div_1}></div>
						<span className={styles.span_1}>{props.children}</span>
					</label>
				);
			case "slide":
				return (
					<label className={[styles.label_1, S_value ? styles.active : ""].join(" ")}>
						{CheckBoxComponent()}
						<div className={styles.div_1}></div>
						<div className={styles.div_2} style={{ width: width }}>
							{checkText(textArray[0])}
							{checkText(textArray[1])}
						</div>
					</label>
				);
			case "toggle":
			case "toggle-fx-bg":
				return (
					<label className={[styles.label_1, S_value ? styles.active : ""].join(" ")}>
						{CheckBoxComponent()}
						<div className={styles.div_1}></div>
						<div className={styles.div_2}>
							{checkText(textArray[0])}
							{checkText(textArray[1])}
						</div>
					</label>
				);
			default:
				return <React.Fragment></React.Fragment>;
		}
	};

	return (
		<div ref={componentRef} className={[styles.pwCheckBox, styles[theme], "input-group", className].join(" ")} {...dataset}>
			{ConditionalRender()}
		</div>
	);
};

export default CheckBox;

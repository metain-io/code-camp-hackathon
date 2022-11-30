import React from "react";
import Select, { components } from "react-select";

import styles from "./style.module.scss";

declare namespace SelectBox_Component {
	export interface Value {
		value: string;
		label: string;
		icon: string | undefined;
	}

	export interface Props {
		theme?: string;
		className?: string;
		isMulti?: boolean;
		options: Value[];
		value?: Value[] | Value;
		height?: string;
		dropdownWidth?: string;
		placeholder?: string;
		required?: string;
		disabled?: boolean;
		C_onChange?: (value: Value[] | Value, $dom: HTMLDivElement | null) => void;
	}
}

const SelectBox = React.forwardRef((props: SelectBox_Component.Props, ref) => {
	/* Props ****************************************************************************************************************************************/
	const {
		theme = "react-select",
		className = "",
		isMulti = false,
		options = [],
		value = [{ value: "", label: "", icon: "" }],
		height = "4.2rem",
		dropdownWidth = "20rem",
		placeholder = "",
		required = [],
		disabled = false,
		C_onChange = () => {},
	} = props;

	/* Stores ***************************************************************************************************************************************/

	/* Hooks ****************************************************************************************************************************************/
	const componentRef = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [S_value, changeValue] = React.useState(isMulti ? value : [value]);
	const [S_input, changeInput] = React.useState("");

	React.useImperativeHandle(ref, () => ({
		getValue: F_getValue,
	}));

	/* Variables ************************************************************************************************************************************/
	const { Option } = components;

	/* Life Circle **********************************************************************************************************************************/
	React.useEffect(() => {
		if (props.value !== undefined && JSON.stringify(props.value) !== JSON.stringify(S_value)) {
			changeValue(props.value);
		}
	}, [props.value]);

	/* Api ******************************************************************************************************************************************/

	/* Functions ************************************************************************************************************************************/
	function F_getValue() {
		return S_value;
	}

	function F_getSelectValue(value: SelectBox_Component.Value[]) {
		let array: Array<string> = [];

		value.forEach((item) => {
			if (item.value !== "") {
				array = [...array, item.value];
			}
		});

		return array;
	}

	/* Events ***************************************************************************************************************************************/
	function E_change(value: any) {
		const selectValue = isMulti ? value : [value];
		const inputValue = F_getSelectValue(selectValue).join(",");
		const classList = componentRef.current!.classList;

		changeValue(selectValue);
		changeInput(inputValue);
		C_onChange(selectValue, componentRef.current);

		if (classList.contains("invalid") || classList.contains("valid")) {
			if (inputValue === "") {
				classList.add("invalid");
				classList.remove("valid");
			} else {
				classList.add("valid");
				classList.remove("invalid");
			}
		}
	}

	/* Components ***********************************************************************************************************************************/
	const ControlDOM = ({ children, ...rest }: any) => {
		return (
			<components.Control {...rest}>
				{rest.selectProps.value[0] !== undefined && rest.selectProps.value[0].icon !== undefined && (
					<img src={rest.selectProps.value[0].icon} alt={rest.selectProps.value[0].label} />
				)}
				{children}
			</components.Control>
		);
	};

	const OptionDOM = (props: any) => {
		return (
			<Option {...props}>
				{props.data.icon !== undefined && <img className={styles.img_1} src={props.data.icon} alt={props.data.label} />}
				<span className={styles.span_1}>{props.data.label}</span>
			</Option>
		);
	};

	/* Render ***************************************************************************************************************************************/
	const ConditionalRender = () => {
		switch (theme) {
			case "react-select":
				return (
					<React.Fragment>
						<Select
							isDisabled={disabled}
							isMulti={isMulti}
							classNamePrefix="react-select"
							options={options}
							value={S_value}
							placeholder={placeholder}
							components={
								isMulti
									? {}
									: {
											Control: ControlDOM,
											Option: OptionDOM,
									  }
							}
							onChange={E_change}
						/>
						<input ref={inputRef} className="d-none" value={S_input} data-required={required} readOnly />
					</React.Fragment>
				);
			default:
				return <React.Fragment></React.Fragment>;
		}
	};

	return (
		<div
			ref={componentRef}
			className={[styles.pwSelectBox, styles[theme], "input-group", disabled ? styles.disabled : "", className].join(" ")}
			style={{ "--height": height, "--dropdownWidth": dropdownWidth } as React.CSSProperties}
		>
			{ConditionalRender()}
		</div>
	);
});

export default SelectBox;

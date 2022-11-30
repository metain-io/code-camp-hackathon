import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const Anchor = (props: Anchor_Component.Props) => {
	/* Props **************************************************************************************************************************************************/
	const { theme = "normal", className = "", href = "", onClickHandler = (e: any) => { }, disabled = false, isOpenNewTab = false } = props;

	/* Stores *************************************************************************************************************************************************/

	/* Hooks **************************************************************************************************************************************************/
	const router = useRouter();

	/* Variables **********************************************************************************************************************************************/
	const anchorClass = `${styles.pwAnchor} ${styles[theme]} ${className}`.trim();

	/* Life Circle ********************************************************************************************************************************************/

	/* Api ****************************************************************************************************************************************************/

	/* Functions **********************************************************************************************************************************************/

	/* Events *************************************************************************************************************************************************/

	/* Components *********************************************************************************************************************************************/
	const AnchorComponent = () => {
		if( disabled ) {
			return (
				<a className={[anchorClass, className].join(" ")}>
					{props.children}
				</a>
			)
		}
		if (href.indexOf("://") === -1) {
			return (
				<Link
					href={{
						pathname: href === "#" ? "#" : href,
						query: router.query.lang && {
							lang: router.query.lang,
						},
					}}
					target={isOpenNewTab ? '_blank' : ''}
				>
					<span className={[anchorClass, className].join(" ")} onClick={onClickHandler}>{props.children}</span>
				</Link>
			);
		} else {
			return (
				<a className={[anchorClass, className].join(" ")} href={href} target="_blank" rel="noreferrer noopenner" onClick={onClickHandler}>
					{props.children}
				</a>
			);
		}
	};

	/* Render ***************************************************************************************************************************************/
	const ConditionalRender = () => {
		switch (theme) {
			case "normal":
				return AnchorComponent();
			default:
				return <React.Fragment></React.Fragment>;
		}
	};

	return ConditionalRender();
};

export default Anchor;

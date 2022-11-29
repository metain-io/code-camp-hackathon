import React from "react";
import styles from "./style.module.scss";

const Image = (props: Image_Component.Props) => {
	/* Props ****************************************************************************************************************************************/
	const { theme = "normal", className = "", src = "", width = "auto", height = "auto", alt = "Metain Image" } = props;

	/* Stores ***************************************************************************************************************************************/

	/* Hooks ****************************************************************************************************************************************/
	const componentRef = React.useRef(null);

	const [skeleton, setSkeleton] = React.useState(true);
	const [source, setSource] = React.useState(src);

	/* Variables ************************************************************************************************************************************/
	const imageDefault = "/image/zero/file-status-301.png";
	const imageNotFound = "/image/zero/file-status-404.png";

	/* Life Circle **********************************************************************************************************************************/
	React.useEffect(() => {
		setTimeout(() => setSkeleton(false), 100);
	}, []);

	React.useEffect(() => {
		setSource(F_getImageSrc(src));
	}, [props.src]);

	/* Api ******************************************************************************************************************************************/

	/* Functions ************************************************************************************************************************************/
	function F_getImageSrc(source: string) {
		let imageSrc = source;

		if (imageSrc === "") {
			imageSrc = imageDefault;
		} else if (imageSrc.indexOf("://") === -1) {
			imageSrc = `${imageSrc}`.replace(/\/\//g, "/");
		}

		return imageSrc;
	}

	/* Events ***************************************************************************************************************************************/
	function E_error() {
		setSource(imageNotFound);
	}

	/* Components ***********************************************************************************************************************************/
	const ImageComponent = () => {
		return <img className={styles.img_1} src={F_getImageSrc(source)} width={width} height={height} alt={alt} itemProp="image" onError={E_error} />;
	};

	/* Render ***************************************************************************************************************************************/
	const ConditionalRender = () => {
		switch (theme) {
			case "normal":
				return ImageComponent();
			default:
				return <React.Fragment></React.Fragment>;
		}
	};

	return (
		<div ref={componentRef} className={[styles.pwImage, styles[theme], skeleton ? styles.skeleton : "", className].join(" ")}>
			{ConditionalRender()}
		</div>
	);
};

export default Image;

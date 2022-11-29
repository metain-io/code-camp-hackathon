import React from "react";

const useResponsive = () => {
    /* Variables **************************************************************************************************************************/

    /* Hooks ******************************************************************************************************************************/
    const [deviceType, setDeviceType] = React.useState(getDeviceType());

    React.useEffect(() => {
        resizeFunction();

        window.addEventListener("resize", resizeFunction);
        return () => {
            window.removeEventListener("resize", resizeFunction);
        };
    }, []);

    /* Functions **************************************************************************************************************************/
    function resizeFunction() {
        setDeviceType(getDeviceType());
    }

    function getDeviceType() {
        if (window.innerWidth > 1007) {
            return "browser";
        } else if (window.innerWidth > 700) {
            return "tablet-large";
        } else if (window.innerWidth > 480) {
            return "tablet";
        } else {
            return "mobile";
        }
    }

    /* Split Component ********************************************************************************************************************/

    /* Render *****************************************************************************************************************************/
    return deviceType;
};

export default useResponsive;

import { useEffect, useState } from 'react';

/*
  * Window resize event listener

    @params size         'isLargeView' & 'isMobileView'

    @return boolean
*/
const useWindowSizeChange = (size) => {
    const [isLargeView, setIsLargeView] = useState(window.innerWidth > 1076);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            if (isLargeView !== (window.innerWidth > 1076)) {
                setIsLargeView(window.innerWidth > 1076);
            }

            if (isMobileView !== (window.innerWidth < 768)) {
                setIsMobileView(window.innerWidth < 768);
            }
        };
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [window.innerWidth]);

    if (size === 'isLargeView') {
        return isLargeView;
    }

    if (size === 'isMobileView') {
        return isMobileView;
    }

};

export default useWindowSizeChange;

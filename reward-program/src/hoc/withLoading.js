import { Component, useState } from "react";
import Loading from "../components/loading/Loading.jsx";
// import Loading from "../pages/loading";

export const withLoading = (WrappedComponent) => {
    function HOC(props) {
        const [isLoading, setLoading] = useState(true);

        const updateLoading = (val) => {
            setLoading(val);
        };
        return (
            <>
                {isLoading && <Loading isLoading={isLoading} />}
                <WrappedComponent {...props} updateLoading={updateLoading} />
            </>
        );
    }
    return HOC;
};
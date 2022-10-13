import {useEffect, useRef} from "react";

export const usePagination = (ref, noLoad, isLoading, callback) => {
    const observer = useRef();

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        var cb = function(entries, observer) {
            if (entries[0].isIntersecting && !noLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}
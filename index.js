import {useCallback, useEffect, useState} from "react";

const useToggle = (initialValue = false) => {
    const [open, setOpen] = useState(initialValue);

    const handleToggle = useCallback(
        () => setOpen((prevState) => !prevState),
        []
    );

    return [open, handleToggle];
};
const useListToggle = () => {
    const layout = sessionStorage.getItem("repox_layout");
    const [isList, toggle] = useToggle(layout === "LIST");

    useEffect(() => {
        if (isList) {
            sessionStorage.setItem("repox_layout", "LIST");
        } else {
            sessionStorage.setItem("repox_layout", "DEFAULT");
        }
    }, [isList]);

    return [isList, toggle];
};

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (prop) => (e) => {
        const value = e.target ? e.target.value : e.value || e;
        setValues({
            ...values,
            [prop]: value,
        });
    };

    const updateInitial = useCallback((values) => {
        setValues(values);
    }, []);

    return [values, handleChange, updateInitial];
};


export {
    useToggle,
    useListToggle,
    useForm
}

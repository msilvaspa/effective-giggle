import react from 'react';
import { FormLabel } from 'react-bootstrap';

type ButtonProps = {
    label: string;
    handleChange: any;
}

export const Input = ({ label, handleChange }: ButtonProps) => {
    return <>
        <FormLabel htmlFor="input">{label}</FormLabel>
        <input id="input" onChange={handleChange}></input>
    </>
}

export { }
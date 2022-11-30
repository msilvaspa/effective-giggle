import react from 'react';
import Bbutton from 'react-bootstrap/Button';

type ButtonProps = {
    title: string;
    handleClick: () => void;
}

export const Button = ({ title, handleClick }: ButtonProps) => {
    return <Bbutton onClick={handleClick}>{title}</Bbutton>
}

export { }
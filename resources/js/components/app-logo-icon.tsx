import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { className, ...rest } = props;
    return (
        <img
            src="/images/logo.jpeg"
            alt="AlphaBeta Academy"
            className={`rounded-md ${className || ''}`}
            {...rest}
        />
    );
}

import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/images/logo.jpeg"
            alt="Alpha Beta Safety Academy Logo"
            className={`h-8 w-auto ${props.className || ''}`}
        />
    );
}

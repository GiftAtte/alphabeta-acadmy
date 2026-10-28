import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center">
                <img src="/images/logo.jpeg" alt="Alpha Beta Safety Academy Logo" className="h-8 w-auto rounded-md" />
                <div className="ml-2 grid flex-1 text-left text-sm">
                    <span className="mb-0.5 truncate leading-none font-semibold">AlphaBeta Academy</span>
                </div>
            </div>
        </>
    );
}

import {Head, Link} from '@inertiajs/react';

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome"/>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                    alt=""/>
                <div
                    className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="">
                                <svg width="128px" height="128px" viewBox="0 0 128 128"
                                     aria-hidden="true" role="img" className="iconify iconify--noto"
                                     preserveAspectRatio="xMidYMid meet">
                                    <path
                                        d="M110.55 117.41L76.92 63.69l29.73-44.82c.45-.69.5-1.57.1-2.3a2.222 2.222 0 0 0-1.97-1.18H80.34c-.74 0-1.45.38-1.86 1L51.49 57.08V17.64c0-1.24-1.01-2.24-2.24-2.24h-21.9c-1.24 0-2.24 1-2.24 2.24V118.6c0 1.24 1 2.24 2.24 2.24h21.9c1.23 0 2.24-1 2.24-2.24V70.55l30.82 49.24c.41.65 1.13 1.05 1.9 1.05h24.44c.81 0 1.57-.44 1.96-1.16c.39-.71.37-1.58-.06-2.27z"
                                        fill="none" stroke="#FF2D20" strokeWidth="2"></path>
                                </svg>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black text-2xl ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black text-2xl ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black text-2xl ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                    </div>
                </div>
            </div>
        </>
    );
}

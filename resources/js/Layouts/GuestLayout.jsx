import {Head} from "@inertiajs/react";

const Guest = ({ title, children }) => {
    return (
        <main>
            <Head title={title} />
            <div
                className={
                    "flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
                }
            >
                {children}
            </div>
        </main>
    );
};

export default Guest;

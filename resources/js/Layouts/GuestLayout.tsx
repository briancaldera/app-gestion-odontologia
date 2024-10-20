import {Head} from "@inertiajs/react";

const Guest = ({ title, children }) => {
    return (
        <main className={"min-h-screen flex justify-center items-center"}>
            <Head title={title} />
            {children}
        </main>
    );
};

export default Guest;

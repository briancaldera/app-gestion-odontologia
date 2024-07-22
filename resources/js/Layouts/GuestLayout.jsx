import Surface from "@/Components/atoms/Surface.jsx";

const Guest = ({ children }) => {
    return (
        <main>
            <div
                className={
                    "flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
                }
            >
                <Surface
                    className={
                        "mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md"
                    }
                >
                    {children}
                </Surface>
            </div>
        </main>
    );
};

export default Guest;

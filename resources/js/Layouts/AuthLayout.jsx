const AuthLayout = ({navbar, sidebar, children}) => {
    return (
        <>
            <nav>{navbar}</nav>
            <aside>{sidebar}</aside>
            <main>
                {children}
            </main>
        </>
    )
}

export default AuthLayout

const AuthLayout = (
    { children }: { children: React.ReactNode }
) => {
    return ( 
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {children}
        </div>
     );
}
 
export default AuthLayout;
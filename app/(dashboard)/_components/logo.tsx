import Image from "next/image";

export const Logo = () => {
    return ( 
        <Image
         height={50}
            width={35}
            alt="logo"
            src="/logo.svg"
        />
    )
}
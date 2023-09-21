import Image from "next/image";
import logo from "../../images/logo.png"


const Footer = ({}) => {
    return (
        <div className="w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center gap-4 ">
            <Image className="w-24 mt-4" src={logo} alt="logo" />
            <p>All rights reserved {" "}
                <a className="hover:text-white hover:underline decoration-[1px] cursor-pointer duration-300" href="https://www.linkedin.com/in/christian-daniel-miranda-8b5243172/" target="_blank">Christian Daniel Miranda</a></p>
        </div>
    )
}

export default Footer
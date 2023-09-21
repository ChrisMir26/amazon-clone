import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { RiShoppingCartLine } from "react-icons/ri";
import BottomHeader from "../BottomHeader/BottomHeader";
import Link from "../../../node_modules/next/link";
import { useSelector, useDispatch } from "react-redux";
import { StateProps } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { addUser } from "@/store/nextSlice";
import { useRouter } from "next/router";


export const Header = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();


  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          productData:productData,
          favoriteData:favoriteData,
        })
      );
      router.push("/");


    }
  }, [session, favoriteData]);
  console.log(userInfo)

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* Logo */}
        <div
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center 
            justify-center h-[70%]"
        >
          <Link href={"/"}>
            <Image
              className="w-28 object-cover mt-1"
              src={logo}
              alt="logoImg"
            />
          </Link>
        </div>
        {/* Delivery*/}
        <div
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center 
            justify-center h-[70%] hidden xl:inline-flex gap-1"
        >
          <SlLocationPin />
          <div>
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">usa</p>
          </div>
        </div>
        {/* SearchBar*/}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search next_amazon_yt products "
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md  rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/* SignIn*/}

        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <img
              src={userInfo.image}
              alt="user img"
              className="w-8 h-8 rounded-full object-cover mr-1"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              signIn();
            }}
            className="text-xs  text-gray-100 flex flex-col justify-center px-2 border border-transparent
             hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}






        {/* Favorite */}
        <div className="relative text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
        {userInfo ?
        (
          <Link href={"/favPage"}>
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {userInfo?.favoriteData && userInfo?.favoriteData?.length > 0 && (
            <span
              className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center
        justify-center text-ms text-amazon_yellow"
            >
              {userInfo?.favoriteData?.length}
            </span>
          )}
        </Link>
        )
        :
        (
          <Link href={"/favPage"}>
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData && favoriteData.length > 0 && (
            <span
              className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center
        justify-center text-ms text-amazon_yellow"
            >
              {favoriteData.length}
            </span>
          )}
        </Link>
        )
          }
        </div>







        
        {/* Cart */}

        {userInfo  ?
          (
            <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
              <Link href={"/CartPage"}>
                <RiShoppingCartLine className="w-auto text-3xl  h-8" />
              </Link>

              <p className="text-xs text-white font-bold mt-3">Cart</p>
              <span className="absolute text-amazon_yellow text-sm -top-1 left-[23px] font-semibold ">
                {userInfo?.productData ? userInfo.productData?.length : 0}
              </span>
            </div>
          )
          :
          (
            <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
              <Link href={"/CartPage"}>
                <RiShoppingCartLine className="w-auto text-3xl  h-8" />
              </Link>

              <p className="text-xs text-white font-bold mt-3">Cart</p>
              <span className="absolute text-amazon_yellow text-sm -top-1 left-[23px] font-semibold ">
                {productData ? productData.length : 0}
              </span>
            </div>
          )}


      </div>
    </div>
  );
};


// import Image from "next/image";
// import logo from "../../images/logo.png";
// import cartIcon from "../../images/cartIcon.png";
// import { BiCaretDown } from "react-icons/bi";
// import { HiOutlineSearch } from "react-icons/hi";
// import { SlLocationPin } from "react-icons/sl";
// import { RiShoppingCartLine } from "react-icons/Ri";
// import BottomHeader from "../BottomHeader/BottomHeader";
// import Link from "../../../node_modules/next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { StateProps } from "../../../type";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useEffect } from "react";
// import { addUser } from "@/store/nextSlice";
// import { useRouter } from "next/router";

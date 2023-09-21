import React, { ReactNode } from "react";
import BottomHeader from "../BottomHeader/BottomHeader";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";

interface Props {
    children:  ReactNode ;
}

const RootLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <BottomHeader />
            {children}
            <Footer />
        </>
    );
};

export default RootLayout;
 
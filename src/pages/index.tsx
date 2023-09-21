import Banner from '@/components/Banner/Banner'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import Products from '@/components/Products/Products'
import {ProductProps }from "../../type"

interface Props{
  productData: ProductProps;
}

export default function Home({productData}: Props) {
  return (
    <main 
    >

      <div className='max-w-screen-3xl mx-auto   '> 

        <Banner />
        <div className='relative md:-mt020 lgl:-m3-32 xl:-mt-60 z-20 mb-10 '>
        <Products productData={productData}/>
        </div>
 
      </div>

    </main>
  )
}

//SSR for data fetching

export const getServerSideProps = async() =>{
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech")
  const productData = await res.json() 
  return {props:{productData}}
}
import React from "react";
import Image from "../../../node_modules/next/image";
import FormattedPrice from "../FormattedPrice/FormattedPrice";
import { LuMinus, LuPlus } from "react-icons/lu"
import  {useDispatch} from "react-redux"
import { increaseQuantity, decreaseQuantity,deleteProduct } from "@/store/nextSlice";

// Define una interfaz "Item" que describe la estructura de un elemento de producto.
interface Item {
    brand: string;
    category: string;
    description: string;
    image: string;
    isNew: boolean;
    oldPrice: number;
    price: number;
    title: string;
    _id: number;
    quantity: number; // Agrega una propiedad "quantity" para rastrear la cantidad de productos en el carrito.
}

// Define una interfaz "cartProductsProps" que describe las propiedades esperadas por el componente "CardProduct".
interface cartProductsProps {
    item: Item; // Indica que "item" debe ser un objeto que cumple con la interfaz "Item".
}

// Define el componente "CardProduct" que recibe un elemento de producto como propiedad.
const CardProduct = ({ item }: cartProductsProps) => {

    const dispatch = useDispatch()


    return (
        <div className="bg-gray-100 rounded-lg flex items-center gap-4 ">
            <Image
                className="object-cover"
                width={150}
                height={150}
                src={item.image}
                alt="product img "
            />
            <div className="flex items-center px-2 gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-600">
                        Unit Price{" "}
                        <span className="font-semibold text-amazon_blue">
                            <FormattedPrice amount={item.price} />
                        </span>
                    </p>
                <div className="flex items-center gap-6">
                    <div className="flex items-center mt-1 justify-between border border-gray-300 px1 py-1 rounded-full w-20 shadow-lg shadow-gray-300">
                        <span onClick={(e)=>{
                            dispatch(increaseQuantity({_id: item._id,
                                brand: item.brand,
                                category:item.category,
                                image: item.image,
                                description:item.description,
                                isNew:item.isNew,
                                oldPrice:item.oldPrice,
                                price:item.price,
                                title:item.title,
                                quantity:1}))
                        }} className="px-2 w-7 h-7 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-200" ><LuPlus /></span>
                        <span >{item.quantity}</span>
                        <span onClick={(e)=>{
                            dispatch(decreaseQuantity({_id: item._id,
                                brand: item.brand,
                                category:item.category,
                                image: item.image,
                                description:item.description,
                                isNew:item.isNew,
                                oldPrice:item.oldPrice,
                                price:item.price,
                                title:item.title,
                                quantity:1}))
                        }} className="px-2 w-7 h-7 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-200"><LuMinus /></span>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300">
                        <h1>X {""} <span  onClick={(e)=>{
                            dispatch(deleteProduct({_id: item._id,
                                brand: item.brand,
                                category:item.category,
                                image: item.image,
                                description:item.description,
                                isNew:item.isNew,
                                oldPrice:item.oldPrice,
                                price:item.price,
                                title:item.title,
                                quantity:1}))
                        }}>remove</span></h1> 
                    </div>
                </div>
                </div>
                <div className="text-lg font-semibold text-amazon_blue">
                    <FormattedPrice amount={item.price * item.quantity} />
                </div>
            </div>
        </div>
        // El componente simplemente renderiza un div con el texto "CardProduct".
    );
};

export default CardProduct; // Exporta el componente para que pueda ser utilizado en otros lugares de la aplicación.

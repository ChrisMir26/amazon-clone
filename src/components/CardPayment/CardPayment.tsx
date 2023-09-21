
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "../FormattedPrice/FormattedPrice";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useEffect, useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
import { useSession } from "next-auth/react"

const CardPayment = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amt = 0;
    const dataToMap = userInfo ? userInfo?.productData : productData;

    dataToMap?.map((item: StoreProduct) => {
      amt += item.price * item.quantity;
      return;
    });
    
    setTotalAmount(amt);
  }, [productData,userInfo.productData]);

  
// Stripe payment (Pago con Stripe)

// Cargar la librería de Stripe en el cliente usando una promesa
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Obtener la sesión actual del usuario (requiere autenticación)
const { data: session } = useSession();

// Función para manejar el proceso de pago
const handleCheckout = async () => {
  // Esperar a que la promesa de Stripe se resuelva y obtener la instancia de Stripe
  const stripe = await stripePromise;

  // Realizar una solicitud POST al servidor para crear una sesión de pago en Stripe
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Enviar datos relevantes como los productos y el correo electrónico del usuario
    body: JSON.stringify({ items: userInfo.productData, email: session?.user?.email }),
  });

  // Parsear la respuesta JSON que contiene la información de la sesión de pago en Stripe
  const checkoutSession = await response.json();

  // Redirigir al usuario al flujo de pago de Stripe usando la sesión creada
  const result: any = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.id,
  });

  // Mostrar una alerta si hay un error en el proceso de redirección
  if (result.error) {
    alert(result?.error.message);
  }
};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>
      {userInfo ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleCheckout}
            className="w-full h-10 text-sm font-semibold bg-amazon_blue text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
          >
            Proceed to Buy
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Proceed to Buy
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default CardPayment;




import { ArrowRight } from "lucide-react";

export default function CheckoutProcessing({ total }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white px-4 py-3 shadow-lg md:static md:right-0 md:mx-0 md:w-auto md:bg-transparent md:px-0 md:py-0 md:shadow-none">
      <div className="mx-auto max-w-7xl md:mx-0 md:w-full">
        <div className="flex flex-col gap-3 md:flex-col md:items-start">
          <p className="text-sm font-bold opacity-75 md:text-base">Total:</p>
          <h2 className="text-lg font-bold">{total} TZS</h2>
          <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#781717] px-10 py-3 text-sm font-semibold text-white hover:bg-[#5a1212] md:w-auto md:text-base">
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

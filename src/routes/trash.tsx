import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../utils/types";
import { LoadingSpinner } from "../components/loading-spinner";
import { ProductItem } from "../components/product-item";

export function Trash() {
  async function fetchTrash() {
    const result = await axios.get<Product[]>("http://localhost:8000/trash");
    return result.data;
  }

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trash"],
    queryFn: fetchTrash,
  });

  if (isError) {
    return <p className="text-red-500">Oops something went wrong</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            products?.map((product) => <ProductItem product={product} trash />)
          )}
        </div>
      </div>
    </div>
  );
}

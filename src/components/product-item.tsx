import { Link } from "react-router-dom";
import { Product } from "../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  async function deleteProduct(id: number) {
    await axios.post("http://localhost:8000/trash", product);
    await axios.delete(`http://localhost:8000/products/${id}`);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete", "product", product.id],
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return (
    <div>
      <Link key={product.id} to={`/products/${product.id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-transparent xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 w-full object-contain object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {product.price} €
        </p>
      </Link>
      <button
        onClick={() => mutate()}
        className="rounded-md text-white bg-red-600 py-1 px-2 mt-2 hover:bg-red-800"
      >
        Delete Product
      </button>
    </div>
  );
}

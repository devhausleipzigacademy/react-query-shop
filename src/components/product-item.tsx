import { Link } from "react-router-dom";
import { Product } from "../utils/types";

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  return (
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
  );
}

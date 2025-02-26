import { type Product } from "../utils/types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Policies } from "../components/policies";
import { SizePicker } from "../components/size-picker";
import { classNames } from "../utils/stying";
import { ColorPicker } from "../components/color-picker";
import { Reviews } from "../components/reviews";
import { useQuery } from "@tanstack/react-query";

const details = [
  "Only the best materials",
  "Ethically and locally made",
  "Pre-washed and pre-shrunk",
  "Machine wash cold with similar colors",
];

export function Product() {
  const { id } = useParams();

  async function fetchProduct(id: string) {
    try {
      // We try to find a product
      const { data: foundProduct } = await axios.get<Product>(
        `http://localhost:8000/products/${id}`
      );
      // if above line succeed we return product - otherwise we jump into catch
      return foundProduct;
    } catch (error) {
      // Porduct was not found
      try {
        // We try to find a trash item
        const { data: foundTrashItem } = await axios.get<Product>(
          `http://localhost:8000/trash/${id}`
        );
        // if above line succeed we return trash item - otherwise we jump into catch
        return foundTrashItem;
      } catch (error) {
        // if we didn't find a product or trash item
        throw new Error("Product not found");
      }
    }
  }

  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
    // refetchInterval: 10000,
  });

  if (product) {
    return (
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product?.title}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    {product?.price}
                  </p>
                </div>
                <Reviews rating={product.rating} />
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={classNames(
                      "lg:col-span-2 lg:row-span-2",
                      "rounded-lg"
                    )}
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <form>
                  <ColorPicker />

                  <SizePicker />

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>

                  <div
                    className="prose prose-sm mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-sm font-medium text-gray-900">
                    Fabric &amp; Care
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      {details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Policies />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

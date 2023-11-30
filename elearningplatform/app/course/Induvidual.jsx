"use client";
import Button from "../(components)/Button";
import useBasket from "../hooks/useBasket";

export default function Induvidual({
  author,
  price,
  imageSrc,
  name,
  courseId,
  description,
  currentUser,
}) {
  const { hasBasket, toggleBasket } = useBasket({
    currentUser,
    courseId,
  });

  return (
    <div>
      <div className="h-[60vh] bg-zinc-900 flex justify-between text-white px-14 items-center">
        <div>
          <h1 className="text-[4rem]">{name}</h1>
          <p>{author}</p>
          <p>{description}</p>
          <p>{price}</p>
        </div>

        <div className="w-[400px] bg-white p-1 text-black">
          <img
            src={imageSrc}
            alt="Image"
            width={200}
            height={200}
            className="w-full object-cover"
          />

          <div>
            <p>$ {price}</p>

            <div className="flex flex-col gap-1 mt-4">
              <Button
                onClick={toggleBasket}
                type="button"
                label={`${hasBasket ? "Remove from basket" : "Add to basket"}`}
              />
              <Button type="button" label="Buy now" outline />
              <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">
                30 day money back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

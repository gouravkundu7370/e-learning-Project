import axios from "axios";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

const useBasket = ({ courseId, currentUser }) => {
  const rotuer = useRouter();

  const hasBasket = useMemo(() => {
    const list = currentUser?.basketIds || [];
    return list.includes(courseId);
  }, [currentUser, courseId]);

  const toggleBasket = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        let request;

        if (hasBasket) {
          request = () => axios.delete(`/api/basket/${courseId}`);
        } else {
          request = () => axios.post(`/api/basket/${courseId}`);
        }

        await request();
        rotuer.refresh();
      } catch (error) {
        throw new Error(error);
      }
    },
    [currentUser, hasBasket, courseId, rotuer]
  );

  return {
    hasBasket,
    toggleBasket,
  };
};

export default useBasket;

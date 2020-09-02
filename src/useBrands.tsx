import { useEffect, useState } from "react";
import axios from "axios";
import { Brand as BrandInterface, HydraCollection } from "./contracts";

type brandCollection = HydraCollection<BrandInterface>;

function useBrands(page: number, query: string) {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<BrandInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<brandCollection>(
        "https://frontend-dev.allopneus.com/front-api/thesaurus/brands",
        { params: { page, limit: 5, name: query } }
      )
      .then(({ data }) => {
        setLoading(false);
        setBrands(data["hydra:member"]);
      });
  }, [page, query]);

  return loading ? null : brands;
}

export default useBrands;

import React, {useContext} from "react";
import { Brand as BrandInterface } from "./contracts";
import {BoldContext} from "./App";

interface Props {
  brand: BrandInterface;
}

const Brand: React.FC<Props> = ({ brand }) => {
  let bold = useContext(BoldContext);
  if (brand.name === 'Audi') {
    bold = false;
  }

  return (
    <div className="row">
      <div className="col">
        <img
          src={
            "http://img-v2-dev.allopneus.com/brand/label/" + brand.logoFilename
          }
          alt={brand.name}
        />
      </div>
      <div className="col">
        <p className={ bold ? 'font-weight-bold' : 'font-weight-lighter'}>
          {brand.name}
        </p>
      </div>
    </div>
  );
};

export default Brand;

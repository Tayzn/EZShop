import React from "react";

import { Filter } from "./Filter";
import { ProductDisplayGrid } from "./product/ProductDisplayGrid";

export const Inventory = (): JSX.Element => {
    return (
        <div style={{ height: "62%", overflowY: "scroll" }}>
            Inventory <Filter />
            <ProductDisplayGrid />
        </div>
    );
};

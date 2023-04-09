import React from "react";

import { Filter } from "./Filter";

export const Inventory = (): JSX.Element => {
    return (
        <div style={{ height: "62%", overflowY: "scroll" }}>
            Inventory <Filter />
        </div>
    );
};

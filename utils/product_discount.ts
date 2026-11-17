
export const product_discount = (discountAmount: number, discountType: "fixed" | "percent") => {


    if (discountType === "fixed") {
        return `Discount: ৳${discountAmount}`;
    }

    return `Discount: ${discountAmount}%`;


}
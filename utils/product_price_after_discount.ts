
type FnType = (price: number, discount: number, discountType: "percent" | "fixed") => number;

export const productPriceAfterDiscount: FnType = (price, discount, discountType) => {
    if (discountType === "fixed") {
        return price - discount;
    }
    const discountAmount = (discount / 100) * price;
    return price - discountAmount;
}


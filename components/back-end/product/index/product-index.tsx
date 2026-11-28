/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ProductType } from "@/types/product";
import { ProductPriceType } from "@/types/product_price";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function ProductIndex() {
    const [products, setProducts] = useState<any>([]);
    const [paginate, setPaginate] = useState({
        from: 0,
        to: 2,
        total: 0,
        activePage: 1
    })
    const db = createClient();


    /**
     * Image
     * Title
     * Sizes and prices
     * Count of Gallery Images
     * Featured
     */

    useEffect(() => {


        const getData = async () => {

            const { data, error, count } = await db.from("products")
                .select(`*, 
                    product_prices(*), 
                    product_images(*)`,
                    { count: "exact" }
                )
                .range(paginate.from, paginate.to);

            if (error) {
                console.log(error);
                return;
            }

            console.log(count);


            setProducts(data);
            setPaginate((prev) => {
                return {
                    ...prev,
                    total: count as number
                }
            })


        }

        getData();



    }, [db, paginate.from, paginate.to]);



    const itemsPerPage = paginate.to - paginate.from + 1;

    const handlePaginate = (index: number) => {

        setPaginate(prev => {
            return {
                ...prev,
                // from: (page - 1) * limit
                from: index * 3,
                to: (index * 3) + 3 - 1,
                // to: from + limit - 1 ,
                activePage: index + 1
            }
        })

    }

    console.log(products);



    return (
        <div>
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Size & Price</TableHead>
                        <TableHead>Gallery Items</TableHead>
                        <TableHead>Is Featured</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((item: ProductType) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>
                                <Image
                                    src={item.image}
                                    alt="image text"
                                    width={80}
                                    height={60}
                                />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-2">
                                    {item.product_prices?.map(({ price, size, id }: ProductPriceType) => (
                                        <span key={id} className="inline-block px-1 bg-green-300 rounded-sm">{price} / {size}</span>

                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>{item.product_images?.length} Items</TableCell>
                            <TableCell>
                                {item.featured ?
                                    <span className="text-green-500">Yes</span>
                                    :
                                    <span className="text-red-500">No</span>
                                }
                            </TableCell>
                            <TableCell className="text-right">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>

            <div>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <Button disabled={(index + 1) === paginate.activePage} onClick={() => handlePaginate(index)} key={index}>{index + 1}</Button>
                ))}
            </div>
        </div>
    )
}

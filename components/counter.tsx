"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>Counter

            <Button onClick={() => console.log("ok")}>Click me</Button>
        </div>
    )
}

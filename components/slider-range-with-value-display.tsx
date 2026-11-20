"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const SliderRangeWithValueDisplay = () => {
  const [value, setValue] = useState([30, 70]);

  const handleValueChange = (next: number | readonly number[]) => {
    setValue(Array.isArray(next) ? [...next] : [next]);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>Range</Label>
        <span className="text-muted-foreground text-sm tabular-nums">
          {value[0]} - {value[1]}
        </span>
      </div>
      <Slider
        aria-label="Range"
        max={100}
        min={0}
        onValueChange={handleValueChange}
        value={value}
      />
    </div>
  );
};

export default SliderRangeWithValueDisplay;

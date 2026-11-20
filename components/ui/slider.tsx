"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type React from "react";
import {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/ui/field";

type SliderProps = SliderPrimitive.Root.Props &
  Pick<SliderPrimitive.Thumb.Props, "getAriaLabel" | "getAriaValueText">;

/**
 * Where a `SliderLabel` inside `Slider` hands up its `id`, for the slider
 * to pass on as `aria-labelledby` (Base UI gives it to each thumb).
 */
const SliderLabelContext = createContext<React.Dispatch<
  React.SetStateAction<string | undefined>
> | null>(null);

/**
 * Base UI names a thumb from its own `aria-label` (or `getAriaLabel`), not
 * the root's: the slider's `aria-label` names each thumb too.
 */
export const Slider = (props: SliderProps) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className,
    getAriaLabel,
    getAriaValueText,
    defaultValue,
    value,
    min = 0,
    max = 100,
    children,
    ...rest
  } = props;
  const [labelId, setLabelId] = useState<string>();

  // One thumb per entry of an array, and one for a number or no value at
  // all (Base UI's default value is `min`, a single value).
  const current = value ?? defaultValue;
  const thumbCount = Array.isArray(current) ? current.length : 1;

  return (
    <SliderLabelContext.Provider value={setLabelId}>
      <SliderPrimitive.Root
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? labelId}
        className={cn(
          "flex flex-col gap-3 data-vertical:h-full data-horizontal:w-full",
          className
        )}
        data-slot="slider"
        defaultValue={defaultValue}
        max={max}
        min={min}
        thumbAlignment="edge"
        value={value}
        {...rest}
      >
        {children}
        <SliderPrimitive.Control className="data-vertical:min-h-40 relative flex w-full touch-none select-none items-center data-vertical:h-full data-vertical:w-auto data-vertical:flex-col data-disabled:opacity-50">
          <SliderPrimitive.Track
            className="bg-muted rounded-full data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1 relative grow select-none overflow-hidden"
            data-slot="slider-track"
          >
            <SliderPrimitive.Indicator
              className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
              data-slot="slider-range"
            />
          </SliderPrimitive.Track>
          {Array.from({ length: thumbCount }, (_, index) => {
            const key = `slider-thumb-${index}`;

            return (
              <SliderPrimitive.Thumb
                aria-label={ariaLabel}
                className="border-ring ring-ring/50 relative size-3 rounded-full border bg-white transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
                data-slot="slider-thumb"
                getAriaLabel={getAriaLabel}
                getAriaValueText={getAriaValueText}
                key={key}
              />
            );
          })}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </SliderLabelContext.Provider>
  );
};

/**
 * Inside `Slider`, labels it as `aria-labelledby` would, so it names every
 * thumb that has no `aria-label`. Outside it, a plain `<label>`: give it an
 * `id` and pass that to `Slider` as `aria-labelledby`.
 */
export const SliderLabel = (props: React.ComponentProps<typeof FieldLabel>) => {
  const { children, id, ...rest } = props;
  const generatedId = useId();
  const labelId = id ?? generatedId;
  const setLabelId = useContext(SliderLabelContext);

  useLayoutEffect(() => {
    if (!setLabelId) {
      return;
    }
    setLabelId(labelId);
    return () =>
      setLabelId((current) => (current === labelId ? undefined : current));
  }, [labelId, setLabelId]);

  return (
    <FieldLabel data-slot="slider-label" id={labelId} {...rest}>
      {children}
    </FieldLabel>
  );
};

export const SliderValue = (props: React.ComponentProps<"output">) => {
  const { className, ...rest } = props;

  return (
    <output
      className={cn("ms-auto tabular-nums", className)}
      data-slot="progress-value"
      {...rest}
    />
  );
};

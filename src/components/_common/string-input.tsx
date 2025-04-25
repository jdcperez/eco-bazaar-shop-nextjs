import { FieldErrorMessage } from "@/components/_common/field-error-message";
import { TextField } from "@radix-ui/themes";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

const StringInput = forwardRef(
  (
    {
      control,
      errors,
      name,
      placeholder,
    }: {
      control: any;
      errors: any;
      name: string;
      placeholder: string;
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name={name}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField.Root
              size="3"
              placeholder={placeholder}
              color={errors[name] ? "red" : "green"}
              value={value}
              onChange={(e) => {
                const filteredValue = e.target.value;
                  onChange(filteredValue);
              }}
              // @ts-ignore
              type={"text"}
              ref={ref as React.Ref<HTMLInputElement>}
            >
                
            </TextField.Root>
          )}
        />
        <FieldErrorMessage errorFor={errors[name]} />
      </div>
    );
  }
);

StringInput.displayName = "StringInput";

export default StringInput;

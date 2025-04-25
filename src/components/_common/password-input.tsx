import React from "react";
import { TextField } from "@radix-ui/themes";
import { useState, forwardRef } from "react";
import { Controller } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";
import { FieldErrorMessage } from "@/components/_common/field-error-message";

const PasswordInput = forwardRef(
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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <>
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
                type={isPasswordVisible ? "text" : "password"}
                ref={ref as React.Ref<HTMLInputElement>}
              >
                <button
                  type="button"
                  className="inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </TextField.Root>
            )}
          />
          <FieldErrorMessage errorFor={errors[name]} />
        </div>
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

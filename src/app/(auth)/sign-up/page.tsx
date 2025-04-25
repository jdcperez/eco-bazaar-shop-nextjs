"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Card, Checkbox, Flex, Heading, Text } from "@radix-ui/themes";
import StringInput from "@/components/_common/string-input";
import PasswordInput from "@/components/_common/password-input";
import { DefaultButton } from "@/components/_common/buttons";

import { signUpSchema } from "@/utils/form-validation-schema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { UsersLogin } from "@/api/users";

import { FieldErrorMessage } from "@/components/_common/field-error-message";
import { merge } from "@/utils/css-important";

type SignUpFormData = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SignUpFormData>({
        // @ts-ignore
        resolver: yupResolver(signUpSchema),
    });

    const formSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        // try {
        //     const apiResponse = await UsersLogin(data.email, data.password);
        //     if (apiResponse.statusCode === 200) {
        //         const result = apiResponse?.data;

        //         // encrypting the auth_token
        //         SetEncryptedCookie("auth_token", result.accessToken);
        //     } else {
        //         toast.error("Invalid Credentials");
        //     }
        // } catch (error) {
        //     toast.error("Invalid Credentials");
        // }
        setIsLoading(false);
    };

    return (
        <>
            <title>Sign Up</title>
            <div className="h-auto bg-none">
                <Card className={merge("px-10 py-28 rounded-lg shadow-none text-center")}>
                    <Heading as="h1" size="6" className="text-accent-primary">
                        Welcome!
                    </Heading>
                    <Text className="font-medium mt-1 text-lg text-center" color="gray">
                        Sign up to get started
                    </Text>
                    
                    <div className="flex flex-col gap-5 mt-10">
                        <StringInput
                            control={control}
                            errors={errors}
                            name="email"
                            placeholder="Please Enter Username"
                            ref={emailInputRef}
                        />

                        <StringInput
                            control={control}
                            errors={errors}
                            name="username"
                            placeholder="Please Enter Username"
                            ref={emailInputRef}
                        />

                        <PasswordInput
                            control={control}
                            errors={errors}
                            name="password"
                            placeholder="Please Enter Password"
                            ref={passwordInputRef}
                        />

                        <PasswordInput
                            control={control}
                            errors={errors}
                            name="confirmPassword"
                            placeholder="Please Re-Enter Password"
                            ref={passwordInputRef}
                        />

                        <Controller
                            name="terms"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Text as="label" size="3">
                                    <Flex as="span" gap="2" className="text-left">
                                        <Checkbox
                                            size="3"
                                            checked={value}
                                            onCheckedChange={(val: any) => onChange(val)}
                                        />
                                        <span>
                                            By creating an account means you agree to the
                                            Terms & Conditions and our Privacy Policy.
                                        </span>
                                    </Flex>
                                </Text>
                            )}
                        />
                        <FieldErrorMessage errorFor={errors.terms} />

                        <DefaultButton
                            text="Sign Up"
                            isLoading={false}
                            className="w-full cursor-pointer"
                            onClick={handleSubmit(formSubmit)}
                        />
                    </div>
                    <div className="mt-5">
                        <Text className="font-medium">
                            Already have an account?{" "}
                            <Link href="/login">
                                <Text color="green">Log in</Text>
                            </Link>
                        </Text>
                    </div>
                </Card>
            </div >
        </>
    );
}
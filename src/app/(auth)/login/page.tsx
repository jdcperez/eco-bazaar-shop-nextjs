"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button, Card, Heading, Text } from "@radix-ui/themes";
import StringInput from "@/components/_common/string-input";
import PasswordInput from "@/components/_common/password-input";

import { loginSchema } from "@/utils/form-validation-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { UsersLogin } from "@/api/users";

import { SetEncryptedCookie } from "@/utils/encrypt-cookie";

type LoginFormData = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>({
        // @ts-ignore
        resolver: yupResolver(loginSchema),
    });

    const formSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const apiResponse = await UsersLogin(data.username, data.password);
            console.log("apiResponse", apiResponse)
            if (apiResponse.statusCode === 200) {
                const result = apiResponse?.data;

                // encrypting the auth_token
                console.log("result", result);
                SetEncryptedCookie("auth_token", result.accessToken);
                toast.success("Login Successfully");
                router.replace("/dashboard")
            } else {
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials");
        }
        setIsLoading(false);
    };

    return (
        <>
            <title>Login</title>
            <div className="h-auto bg-none">
                <Card className="w-[500px] flex flex-1 align-middle justify-items-center">

                    <Heading as="h1" size="6" color="green">
                        Welcome!
                    </Heading>
                    <Text className="font-medium mt-1 mb-1 text-lg text-center" color="gray">
                        Log in to your account
                    </Text>

                    <div className="flex flex-col gap-3 mt-10 w-full">
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

                        <Link href="/forgot-password" className="w-fit mt-1 text-accent-primary">
                            Forgot Password?
                        </Link>

                        <div className="flex flex-row gap-3 w-full h-full items-center ">
                            <Button
                                size={'3'}
                                className="flex-grow !w-full"
                                disabled={isLoading}
                                style={{
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                }}
                                onClick={handleSubmit(formSubmit)}
                                loading={isLoading}
                            >
                                LOGIN
                            </Button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Text className="font-medium">
                            Didn&apos;t have an account?{' '}
                            <Link href="/sign-up">
                                <Text color="green">Sign up</Text>
                            </Link>
                        </Text>
                    </div>
                </Card>
            </div>
        </>
    );
}
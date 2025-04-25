
import React, { useState, useEffect } from 'react';
import { Button, Flex, Dialog, } from "@radix-ui/themes";
import Image from "next/image";
import { SquareX } from 'lucide-react';

export default function DialogConfirmation({
    trigger,
    title,
    message,
    buttonColor,
    onProceed = () => { },
}: {
    trigger: React.ReactNode,
    title: string,
    message: React.ReactNode,
    buttonColor: any,
    onProceed: () => void,
}) {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px" height="250px">
                <div className="absolute right-0 top-0 -z-10">
                    <Image
                        src="/svg/eclipse.svg"
                        className=" rounded-lg z-0"
                        alt="bg"
                        width={150}
                        height={150}
                    />
                </div>

                <div className="absolute right-3 top-3">
                    <Dialog.Close>
                        <SquareX size="45" />
                    </Dialog.Close>
                </div>

                <Dialog.Title>{title}</Dialog.Title>

                <Dialog.Description size="2" mt="9">
                    {message}
                </Dialog.Description>

                <Flex gap="3" justify="center" className="absolute bottom-2" width="90%">
                    <Dialog.Close>
                        <Button color="gray" size="3" className="!w-1/2">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button color={buttonColor} size="3" className="!w-1/2"
                            onClick={() => onProceed()}
                        >
                            Proceed
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

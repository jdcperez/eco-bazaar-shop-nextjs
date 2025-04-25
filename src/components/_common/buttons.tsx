import { Button } from "@radix-ui/themes";
import { ReactNode } from "react";

const DefaultButton = ({
    text,
    isLoading,
    className,
    icon,
    onClick,
}: {
    text: string,
    isLoading?: boolean,
    className?: string,
    icon?: React.ReactNode,
    onClick?: () => void,
}) => {
    return (
        <Button
            className={`!h-11 flex justify-center items-center px-3 
                !rounded-lg !text-sm !font-bold !text-white !bg-accent-primary  hover:!bg-accent-primary/90 
                
                ${className}`}
            onClick={onClick}
            loading={isLoading}
        >
            {icon}
            {text}
        </Button>
    );
};

export {
    DefaultButton,
};

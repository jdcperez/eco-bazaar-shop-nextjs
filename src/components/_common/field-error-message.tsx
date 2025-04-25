export const FieldErrorMessage = ({ errorFor }: { errorFor: any }) => {
    return (
        <p className="text-xs text-rose-500 text-left">
            {errorFor?.message}
        </p>
    );
};

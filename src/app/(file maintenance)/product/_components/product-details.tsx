import React, { useEffect, useState, } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Grid, IconButton, Spinner, Table, Text, TextField, } from "@radix-ui/themes";
import { CircleCheck, CircleX, FilePenLine } from "lucide-react";
import { CategoryListProps } from "@/types/category";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { categoryDetailsSchema } from "@/utils/form-validation-schema";
import { FieldErrorMessage } from "@/components/_common/field-error-message";
import { useLoadingStore } from "@/store/loading-store";
import { useCategoryAddStore } from "../_store/category-store";
import DialogConfirmation from "@/components/_common/dialog-confirm";
import { CreateCategoryDetails, UpdateCategoryDetails, DeleteCategoryDetails } from "@/api/category";
import toast from "react-hot-toast";
import { useCategoryStore } from "@/store/category-store";

export default function CategoryDetails({
    category,
}: {
    category: CategoryListProps | null,
}) {
    const router = useRouter();
    const { loading, setLoading } = useLoadingStore();
    const [isEdit, setIsEdit] = useState<Boolean>(false);
    const { isCategoryAdd, setIsCategoryAdd } = useCategoryAddStore();
    const { fetchCategory } = useCategoryStore();

    useEffect(() => {
        if (category == null) {
            setIsEdit(true)
        }
    }, [category])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
        trigger
    } = useForm<CategoryListProps>({
        // @ts-ignore
        resolver: yupResolver(categoryDetailsSchema),
        defaultValues: {
            id: category?.id ? category.id : 0,
            name: category?.name ? category.name : "",
        }
    });

    useEffect(() => {
        if (category) {
            setValue("id", category?.id ? category.id : 0);
            setValue("name", category?.name ? category.name : "");
        }
    }, [category]);


    const formCancel = () => {
        reset();
        setIsEdit(false)
        if (category == null) {
            setIsCategoryAdd(false);
        }
    }

    const formSubmit = (data: CategoryListProps) => {
        if (category) {
            saveCategory(data)
        }
        else {
            createCategory(data);
        }
    }

    const createCategory = async (form: CategoryListProps) => {
        setLoading(true);
        try {
            let apiResponse: any = await CreateCategoryDetails(form.name);
            if (apiResponse.statusCode === 200) {
                toast.success("Category Created Successfully");
                setIsCategoryAdd(false);
                fetchCategory(router);
            }
            else {
                toast.error("An unexpected error occurred");
            }
        }
        catch {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    const saveCategory = async (form: CategoryListProps) => {
        setLoading(true);
        try {
            let apiResponse: any = await UpdateCategoryDetails(category?.id, form.name);
            if (apiResponse.statusCode === 200) {
                toast.success("Category Updated Successfully");
                setIsEdit(false);
                fetchCategory(router);
            }
            else {
                toast.error("An unexpected error occurred");
            }
        }
        catch {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    const deleteCategory = async () => {
        setLoading(true);
        try {
            let apiResponse: any = await DeleteCategoryDetails(category?.id);
            if (apiResponse.statusCode === 200) {
                toast.success("Category Deleted Successfully");
                fetchCategory(router);
            }
            else {
                toast.error("An unexpected error occurred");
            }
        }
        catch {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Table.Cell onDoubleClick={() => setIsEdit(true)}>
                {!isEdit ?
                    <Text>{category?.name}</Text>
                    :
                    <div className="">
                        <TextField.Root
                            type="text"
                            placeholder="Category Name"
                            autoFocus
                            {...register("name")}
                        />
                        <FieldErrorMessage errorFor={errors.name} />
                    </div>
                }
            </Table.Cell >

            <Table.Cell className="text-center">
                <Flex direction="row" gap="2" justify="center">
                    <Grid columns="2" gap="2">
                        {loading ? (
                            <Spinner />
                        ) : isEdit ? (
                            <>
                                <DialogConfirmation
                                    trigger={
                                        <IconButton
                                            variant="ghost"
                                            color="grass"
                                        >
                                            <CircleCheck width="20" height="20" />
                                        </IconButton>

                                    }
                                    title={"Category"}
                                    message={<Text size="5" mb="1" weight="bold" align="center">
                                        Are you sure you want to <Text className="text-accent-primary font-bold">SAVE</Text> changes?
                                    </Text>}
                                    buttonColor={"green"}
                                    onProceed={handleSubmit(formSubmit)}
                                />

                                <DialogConfirmation
                                    trigger={
                                        <IconButton
                                            variant="ghost"
                                            color="red"
                                        >
                                            <CircleX width="20" height="20" />
                                        </IconButton>
                                    }
                                    title={"Category"}
                                    message={<Text size="5" mb="1" weight="bold" align="center">
                                        Are you sure you want to <Text className="text-accent-danger font-bold">DISCARD</Text> changes?
                                    </Text>}
                                    buttonColor={"red"}
                                    onProceed={() => formCancel()}
                                />
                            </>
                        ) : (
                            <>
                                <IconButton
                                    variant="ghost"
                                    color="gray"
                                    onClick={() => setIsEdit(true)}
                                >
                                    <FilePenLine width="20" height="20" />
                                </IconButton>

                                <DialogConfirmation
                                    trigger={<IconButton
                                        variant="ghost"
                                        color="red"
                                    >
                                        <CircleX width="20" height="20" />
                                    </IconButton>}
                                    title={"Category"}
                                    message={<Text size="5" mb="1" weight="bold" align="center">
                                        Are you sure you want to <Text className="text-accent-danger font-bold">DELETE</Text> {category?.name}?
                                    </Text>}
                                    buttonColor={"red"}
                                    onProceed={() => deleteCategory()}
                                />
                            </>
                        )}
                    </Grid>
                </Flex>
            </Table.Cell>
        </>
    );
}
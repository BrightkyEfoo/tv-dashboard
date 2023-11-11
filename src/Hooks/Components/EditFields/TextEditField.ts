import { ButtonClickEvent } from "Types/CommonTypes/Events";
import { useTextFieldEditArgsType } from "Types/Hooks/useTextFieldEditFnType";
import React, { useState } from "react";

export const useTextEditField = ({
  setValue,
  submit,
  value,
}: useTextFieldEditArgsType) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: ButtonClickEvent) => {
    setIsLoading(true);
    submit(value).then((_) => {
      setIsEdit(false);
      setIsLoading(false);
    });
  };
  return {
    isEdit,
    setIsEdit,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

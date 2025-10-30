"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Select from "../inputs/Select";
import TextArea from "../inputs/TextArea";
import TextInput from "../inputs/TextInput";

// Validation schema
const AddTransactionSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .transform((_, originalValue) => {
      const cleaned = String(originalValue).replace(/,/g, "");
      return Number(cleaned);
    })
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  type: Yup.string().required("Type is required").oneOf(["credit", "debit"], "Invalid type"),
});

export type AddTransactionFormData = Yup.InferType<typeof AddTransactionSchema>;

interface Props {
  onSubmit: (v: AddTransactionFormData) => Promise<void>;
  isLoading?: boolean;
}

const AddTransactionForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  return (
    <Formik
      initialValues={{
        description: "",
        amount: "",
        type: "",
      }}
      validationSchema={AddTransactionSchema}
      onSubmit={async (values, { resetForm }) => {
        const formattedValues: AddTransactionFormData = {
          ...values,
          amount: Number(values.amount.toString().replace(/,/g, "")), // convert to number
        };
        await onSubmit(formattedValues);
        if (!isLoading) resetForm();
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => {
        // Format amount with commas as user types
        const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value.replace(/,/g, ""); // remove commas
          if (!isNaN(Number(rawValue))) {
            setFieldValue("amount", Number(rawValue).toLocaleString());
          }
        };

        return (
          <Form className='w-full flex flex-col gap-6'>
            <div className='inputs flex flex-col w-full gap-4'>
              {/* Description */}
              <div className='flex flex-col gap-1'>
                <label className='text-xs text-gray-800'>Description</label>
                <Field name='description' as={TextArea} placeholder='Enter transaction description' />
                {touched.description && errors.description && <p className='text-xs text-red-500'>{errors.description}</p>}
              </div>

              {/* Amount and Type */}
              <div className='w-full flex gap-2'>
                <div className='flex-1 flex flex-col gap-1'>
                  <label className='text-xs text-gray-800'>Amount</label>
                  <Field name='amount'>
                    {() => (
                      <TextInput
                        containerClass='h-12'
                        startIcon={<span className='mr-1'>₦</span>}
                        placeholder='0.00'
                        value={values.amount}
                        onChange={handleAmountChange}
                      />
                    )}
                  </Field>
                  {touched.amount && errors.amount && <p className='text-xs text-red-500'>{errors.amount}</p>}
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                  <label className='text-xs text-gray-800'>Type</label>
                  <Field name='type' as={Select} containerClass='h-12'>
                    <option value=''>Select Type</option>
                    <option value='credit'>Credit</option>
                    <option value='debit'>Debit</option>
                  </Field>
                  {touched.type && errors.type && <p className='text-xs text-red-500'>{errors.type}</p>}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-5 py-3 bg-[#27af6d] text-white rounded-lg cursor-pointer font-medium text-[15px] hover:bg-[#239a60] transition disabled:opacity-50'
            >
              {isSubmitting || isLoading ? "Submitting..." : "Continue"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddTransactionForm;

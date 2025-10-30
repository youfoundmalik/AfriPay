import { Formik, Form, Field } from "formik";
import { TransactionSchema } from "../../schemas/transactionSchema";
import type { TransactionFormData } from "../../schemas/transactionSchema";

import Select from "../../ui/Select";
import TextArea from "../../ui/TextArea";
import TextInput from "../../ui/TextInput";
import { TRANSACTION_TYPES } from "../../utils/constant";

interface Props {
  onSubmit: (v: TransactionFormData) => Promise<void>;
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
      validationSchema={TransactionSchema}
      onSubmit={async (values, { resetForm }) => {
        const formattedValues: TransactionFormData = {
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
              <div className='w-full flex flex-col md:flex-row gap-4 md:gap-2'>
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
                    {TRANSACTION_TYPES.map(({ key, label }) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
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

import React from 'react'
import VeezenContainer from '../../../components/VeezenContainer'
import FormTextField from '../../../components/FormItem'

export const expertise = () => {
  return (
    <VeezenContainer title="expertise" navbar="_blank" >
        <FormTextField inputPlaceholder="Your expertise" label="" />
    </VeezenContainer>
  )
}
export default expertise
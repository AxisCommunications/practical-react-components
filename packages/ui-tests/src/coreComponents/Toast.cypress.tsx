import React, { useCallback } from 'react'
import styled from 'styled-components'
import { SiteIcon } from 'practical-react-components-icons'

import {
  useToasts,
  Button,
  spacing,
  ToastId,
} from 'practical-react-components-core'

import { IProgressToast } from './toastCreators'

export const meta = {
  name: 'Toast',
  route: '/components/Toast',
  menu: '',
}

const sleep = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

const NOOP = () => {
  /* */
}

const Wrapper = styled.div`
  display: inline-grid;
  grid-template-columns: auto 1fr;
  max-width: 400px;
  grid-gap: ${spacing.large};
`

const ToastCypressTest = () => {
  const {
    clearToasts,
    showSuccessToast,
    showInfoToast,
    showWarningToast,
    showErrorToast,
    showLoadingToast,
    showProgressToast,
    showActionToast,
  } = useToasts()

  const showSuccess = useCallback(
    () =>
      showSuccessToast({
        label: 'Successfully set parameter',
        onClose: id => {
          console.log('Dismissed toast with ID: %o', id)
        },
      }),
    [showSuccessToast]
  )
  const showSuccessWithMessage = useCallback(
    () =>
      showSuccessToast({
        label: 'Done!',
        message:
          'Successfully set parameter, so now we are super happy with ourselves and tell you about it in an elaborate way.',
      }),
    [showSuccessToast]
  )
  const showInfo = useCallback(
    () =>
      showInfoToast({
        label: 'Note that this will do that.',
      }),
    [showInfoToast]
  )
  const showWarning = useCallback(
    () =>
      showWarningToast({
        label: 'Please, do not do this!',
      }),
    [showWarningToast]
  )
  const showError = useCallback(
    () =>
      showErrorToast({
        label: 'Oops, the server responded with 403',
      }),
    [showErrorToast]
  )
  const showAction = useCallback(
    () =>
      showActionToast({
        label: 'Action',
        action: {
          icon: SiteIcon,
          text: 'Link text',
          link: { variant: 'button', onClick: NOOP },
        },
      }),
    [showActionToast]
  )
  const showLoading = useCallback(async () => {
    showLoadingToast(
      {
        label: 'Loading...',
      },
      'my-simple-loader'
    )
    await sleep(3000)
    showSuccessToast({ label: 'Done!' }, 'my-simple-loader')
  }, [showLoadingToast, showSuccessToast])

  const progressFactory = useCallback(
    (
      label: IProgressToast['label'],
      message?: IProgressToast['message'],
      toastId?: ToastId
    ): readonly [string, (value: number) => string] => {
      const show = (id: string | undefined, value: number) =>
        showProgressToast(
          {
            label,
            message,
            progress: {
              value,
              label: `${Math.max(0, Math.min(Math.round(value * 100), 100))}%`,
            },
          },
          id
        )
      const myToastId = show(toastId, 0)
      const setFraction = (value: number) => show(myToastId, value)
      return [myToastId, setFraction]
    },
    [showProgressToast]
  )

  const showProgress = useCallback(async () => {
    const [id, setValue] = progressFactory('Progressing...')
    for (let i = 0; i <= 100; i++) {
      await sleep(50)
      setValue(i / 100)
    }
    await sleep(300)
    showSuccessToast({ label: 'Done!' }, id)
  }, [progressFactory, showSuccessToast])

  return (
    <Wrapper>
      <Button
        data-cy="Success"
        label="Success"
        variant="primary"
        onClick={showSuccess}
      />
      <Button
        data-cy="SuccessWithMessage"
        label="Success with message"
        variant="primary"
        onClick={showSuccessWithMessage}
      />
      <Button
        data-cy="Info"
        label="Info"
        variant="primary"
        onClick={showInfo}
      />
      <Button
        data-cy="Warning"
        label="Warning"
        variant="primary"
        onClick={showWarning}
      />
      <Button
        data-cy="Error"
        label="Error"
        variant="primary"
        onClick={showError}
      />
      <Button
        data-cy="Action"
        label="Action"
        variant="primary"
        onClick={showAction}
      />
      <Button
        data-cy="Loading"
        label="Loading"
        variant="primary"
        onClick={showLoading}
      />
      <Button
        data-cy="Progress"
        label="Progress"
        variant="primary"
        onClick={showProgress}
      />
      <Button
        data-cy="ClearAll"
        label="Clear all toasts"
        variant="secondary"
        onClick={clearToasts}
        accent={true}
      />
    </Wrapper>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default ToastCypressTest

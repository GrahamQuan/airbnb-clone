'use client'

import dynamic from 'next/dynamic'
import { formatISO } from 'date-fns'
import qs from 'query-string'
import { useState, type FC, useMemo, useCallback } from 'react'
import type { Range } from 'react-date-range'
import { useRouter, useSearchParams } from 'next/navigation'

import Modal from './Modal'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import type { CountrySelectValue } from '../inputs/CountrySelect'
import { onSearchClose } from '@/app/redux/features/searchSlice'
import Heading from '../Heading'
import CountrySelect from '../inputs/CountrySelect'
import Counter from '../inputs/Counter'
import Calendar from '../inputs/Calendar'

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal: FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const isOpen = useAppSelector((state) => state.search.isOpen)
  const dispatch = useAppDispatch()

  const [step, setStep] = useState(STEPS.LOCATION)

  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  )

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    dispatch(onSearchClose())
    router.push(url)
  }, [
    step,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
    dispatch,
  ])

  const actionLabel = useMemo(() => {
    // last step
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    // first step
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  // step(1)
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  // step(2)
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  // step(3)
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={() => dispatch(onSearchClose())}
      body={bodyContent}
    />
  )
}

export default SearchModal

import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import type { FC } from 'react'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

type Props = {
  params: {
    listingId: string
  }
}

const ListingPage: FC<Props> = async ({ params }) => {
  const { listingId } = params
  const listing = await getListingById({ listingId })
  const currentUser = await getCurrentUser()
  const reservations = await getReservations({ listingId })

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage

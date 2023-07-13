import getCurrentUser from './actions/getCurrentUser'
import getListings from './actions/getListings'
import type { ParamsType } from './actions/getListings'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/listings/ListingCard'

type HomePropsType = {
  searchParams: ParamsType
}

const Home = async ({ searchParams }: HomePropsType) => {
  const listings = await getListings(searchParams)
  const user = await getCurrentUser()

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => (
            <ListingCard key={listing.id} currentUser={user} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home

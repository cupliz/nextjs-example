import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import api from '../../services/api'

export default function Landing() {
  const router = useRouter()
  const params = {}
  let url = ''
  if (router.query.page) {
    params.name = router.query.page
    url = '?' + new URLSearchParams(params).toString();
  }
  const { data: logos } = api.useGetLogosQuery()
  const { data: listings } = api.useGetListingsQuery(url)
  const data = useMemo(() => {
    return listings ? listings[0] : {}
  }, [listings])
  return listings?.length ? (
    <div className="h-screen bg-no-repeat bg-cover flex items-center justify-center" style={{ backgroundImage: `url("${data?.background}")` }}>
      <div className='flex space-x-5 space-x-5'>
        {data?.links.length && JSON.parse(data.links).map((link, j) => {
          const logo = logos?.find(x => x.key === link.logo)
          return <a href={link.url} target="_blank" key={j} className="text-center bg-white px-4 py-2 rounded">
            <div className='w-20 h-20 flex items-center justify-center'>
              <img className="w-full" src={logo?.url} alt="" />
            </div>
            <h1>{logo?.name}</h1>
          </a>
        })}
      </div>
      {/* <div className='bg-blue-500 h-50'>
        {data?.links.length ? data.links.map((x, i) => {
          return <div key={i}>{ }</div>
        }) : null}
      </div> */}
    </div>
  ) : <div>Loading...</div>
}

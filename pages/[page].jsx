import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import api from "../services/api";
import { cdn } from "../utils/helper";

const fbTracking = (code) => {
  return code ? (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){
          if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0; n.version='2.0';n.queue=[];
          t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${code}');
          fbq('track', 'PageView');`,
        }}
      ></script>
      <noscript>
        <img
          height="1"
          width="1"
          style="display:none"
          src={`https://www.facebook.com/tr?id=${code}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  ) : (
    ""
  );
};
const gaTracking = (code) => {
  return code ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${code}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${code}');`,
        }}
      ></script>
    </>
  ) : (
    ""
  );
};
export default function Landing() {
  const router = useRouter();
  const params = {};
  let url = "";
  if (router.query.page) {
    params.id = router.query.page.split("-")[0];
    url = "?" + new URLSearchParams(params).toString();
  }
  const { data: logos } = api.useGetLogosQuery();
  const { data: listings } = api.useGetListingsQuery(url);
  const data = useMemo(() => {
    return listings?.length ? listings[0] : null;
  }, [listings]);
  const isDark = data?.theme === "dark";
  const links = data?.links.length ? JSON.parse(data.links) : [];
  const keywords = links.map((x) => x.url.split(".")[1]) || [];
  return data ? (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content={data?.desc} />
        <meta name="keywords" content={keywords.join(", ")} />
        {gaTracking(data.ga)}
        {fbTracking(data.fb)}
      </Head>
      <section
        className="h-screen bg-no-repeat bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url("${cdn(data?.background)}")` }}
      >
        <div className={`overlay-${data?.theme}`}></div>
        <div
          className={`bg-${
            isDark ? "black" : "white"
          } bg-opacity-30 p-5 rounded z-40`}
        >
          <div
            className={`text-${isDark ? "white" : "black"} mb-5 text-center`}
          >
            {data.title}
          </div>
          <div className="flex space-x-5 space-x-5">
            {links.map((link, j) => {
              const logo = logos?.find((x) => x.key === link.logo);
              return (
                <a
                  href={link.url}
                  target="_blank"
                  key={j}
                  className="text-center bg-white px-4 py-2 rounded"
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img className="w-full" src={cdn(logo?.url)} alt="" />
                  </div>
                  <h1>{logo?.name}</h1>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  ) : (
    <section className="h-screen flex items-center justify-center">
      Loading...
    </section>
  );
}

import Script from "next/script";

const Iubenda = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <>
      <Script
        id="iubenda-config-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "siteId": 3809605,
              "cookiePolicyId": 89596576,
              "lang": "it",
              "storage": { "useSiteId": true }
            };
          `,
        }}
      />
      <Script
        src="https://cs.iubenda.com/autoblocking/3809605.js"
        strategy="afterInteractive"
        async
      />
      <Script
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="afterInteractive"
        charset="UTF-8"
        async
      />
    </>
  );
};

export default Iubenda;

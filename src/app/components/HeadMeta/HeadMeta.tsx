import Head from "next/head";
import Script from "next/script";

const HeadMeta: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://ima-quotes.com/favicon.ico" />
        <link rel="shortcut icon" href="https://ima-quotes.com/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="https://ima-quotes.com/favicon.ico"
        />
        <link rel="canonical" href="https://ima-quotes.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:type" content="website" />
        <meta name="title" content="지금, 명언 (Ima-Quotes)" />
        <meta
          name="description"
          content="만약에 지금, 내일 세상이 끝난다면 당신한테 어울리는 명언은?"
        />
        <meta name="Keywords" content="명언, quotes, 지금당신의명언" />
        <meta name="author" content="MEI" />
        <meta
          property="og:image"
          content="https://ima-quotes.com/ogImage.png"
        />
        <meta property="og:title" content="지금, 명언 (Ima-Quotes)" />
        <meta
          property="og:description"
          content="만약에 지금, 내일 세상이 끝난다면 당신한테 어울리는 명언은?"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:image"
          content="https://ima-quotes.com/ogImage.png"
        />
        <meta name="twitter:title" content="지금, 명언 (Ima-Quotes)" />
        <meta
          name="twitter:description"
          content="만약에 지금, 내일 세상이 끝난다면 당신한테 어울리는 명언은?"
        />
        <meta name="twitter:url" content="https://ima-quotes.com" />
        <meta name="twitter:site" content="@DevDance.Mei" />
      </Head>
      <Script
        id="microsoft-clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ni0ep3gk8u");`,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-KR3BY7XJFG`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KR3BY7XJFG');`,
        }}
      />
    </>
  );
};

export default HeadMeta;

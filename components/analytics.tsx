export const Ga4 = () => {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-22GPKX3M7D"></script>
      <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-22GPKX3M7D');
      ` }}> 
      </script>
      <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "koqt743zw4");
      ` }}>
      </script>
    </>
  )
}

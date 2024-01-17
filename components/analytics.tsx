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
    </>
  )
}

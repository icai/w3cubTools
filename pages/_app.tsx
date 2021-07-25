import React, { useEffect, Fragment } from "react";
import { Button, Pane } from "evergreen-ui";

// global css
import "@styles/main.css";
import "@styles/app.scss";
import "@styles/sharebutton/style.scss";
import "@styles/markdown.css";
import "@components/image-to-text/style/modal.css";
import "@components/image-to-text/style/imagePreviewUpload.css";
import "@components/image-to-text/style/transformSetting.css";
import "@components/image-to-text/style/index.scss";
import "@styles/meta.scss";
import "@components/g2048/index.scss";

import NProgress from "nprogress";
import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";
import {
  activeRouteData,
  categorizedRoutes,
  Route,
  routes
} from "@utils/routes";
import Scripts from "@components/Scripts";
import Links from "@components/Links";
import ShareWidget from "@components/ShareButton/Widget";

let reactGa;
if (IN_BROWSER && !IS_DEV) {
  reactGa = require("react-ga");
  reactGa.initialize("UA-145146877-1", {
    debug: IS_DEV
  });
}

const logo = (
  <svg
    width="149"
    height="19"
    viewBox="0 0 149 19"
    xmlns="http://www.w3.org/2000/svg"
    id="icon-logo"
  >
    <path
      fill="#000"
      d="M14.624 15.68L11.731 4.95l-2.93 10.73c-.228.814-.409 1.398-.543 1.752a2.322 2.322 0 0 1-.702.952c-.334.28-.777.421-1.33.421-.448 0-.816-.083-1.105-.25a1.921 1.921 0 0 1-.702-.708 4.449 4.449 0 0 1-.44-1.087c-.113-.419-.215-.807-.305-1.165L.696 3.546c-.18-.7-.269-1.233-.269-1.599 0-.464.163-.854.489-1.172C1.24.458 1.644.3 2.124.3c.66 0 1.103.212 1.33.635.228.423.428 1.038.599 1.843l2.343 10.45 2.625-9.778c.195-.749.37-1.319.525-1.71.155-.39.407-.728.757-1.012.35-.285.826-.428 1.428-.428.61 0 1.084.149 1.422.446.338.297.572.62.702.97s.305.928.525 1.734l2.649 9.778 2.344-10.45c.113-.545.221-.972.323-1.281.102-.31.277-.586.525-.83.248-.245.608-.367 1.08-.367.472 0 .873.157 1.203.47.33.314.494.706.494 1.178 0 .334-.09.867-.269 1.6l-2.978 12.048c-.203.814-.372 1.41-.507 1.788-.134.378-.362.71-.683.995-.322.285-.775.427-1.361.427-.554 0-.997-.138-1.33-.415-.335-.277-.566-.588-.697-.934-.13-.346-.313-.938-.549-1.776zm15.674-7.983c.749 0 1.393-.22 1.935-.66.54-.439.811-1.07.811-1.891a2.26 2.26 0 0 0-.647-1.618c-.43-.452-1.013-.677-1.745-.677-.497 0-.905.069-1.227.207a1.974 1.974 0 0 0-.763.55c-.187.227-.364.52-.53.878-.168.358-.32.696-.459 1.014-.081.17-.228.305-.44.402a1.73 1.73 0 0 1-.732.147c-.325 0-.624-.132-.897-.397-.272-.264-.409-.616-.409-1.056 0-.423.128-.869.385-1.336.256-.468.63-.914 1.123-1.337.492-.423 1.105-.763 1.837-1.02.732-.256 1.55-.384 2.454-.384.789 0 1.51.108 2.16.324a5.047 5.047 0 0 1 1.697.933c.48.407.842.88 1.087 1.416a4.14 4.14 0 0 1 .366 1.734c0 .814-.177 1.511-.531 2.093-.354.582-.86 1.15-1.52 1.703a6.73 6.73 0 0 1 1.605 1.172c.436.44.763.926.983 1.459.22.533.33 1.109.33 1.727 0 .74-.15 1.457-.446 2.149a5.48 5.48 0 0 1-1.312 1.849 6.257 6.257 0 0 1-2.057 1.27c-.794.305-1.67.457-2.63.457-.977 0-1.852-.175-2.625-.525-.774-.35-1.41-.787-1.91-1.312-.501-.525-.88-1.068-1.136-1.63-.256-.561-.385-1.025-.385-1.391 0-.472.153-.853.458-1.142.305-.288.686-.433 1.142-.433.227 0 .447.067.659.201.211.135.35.295.415.483.423 1.13.877 1.971 1.36 2.52.485.55 1.167.824 2.046.824a3.074 3.074 0 0 0 2.618-1.477c.305-.488.458-1.054.458-1.696 0-.953-.26-1.7-.782-2.24-.52-.542-1.245-.812-2.172-.812a8.86 8.86 0 0 0-.757.049 9.311 9.311 0 0 1-.66.048c-.447 0-.793-.111-1.037-.335-.244-.224-.366-.535-.366-.934 0-.39.146-.706.44-.946.292-.24.728-.36 1.305-.36h.5zm21.68 6.982c0 .415-.125.859-.373 1.33-.248.473-.626.922-1.135 1.35-.509.427-1.15.77-1.923 1.031-.773.26-1.644.39-2.612.39-2.059 0-3.666-.6-4.822-1.8-1.155-1.2-1.733-2.81-1.733-4.828 0-1.367.264-2.575.793-3.625a5.696 5.696 0 0 1 2.295-2.435c1.001-.574 2.198-.861 3.59-.861.862 0 1.653.126 2.373.378.72.253 1.331.578 1.831.977s.883.824 1.148 1.276c.264.451.397.872.397 1.263 0 .399-.149.736-.446 1.013a1.528 1.528 0 0 1-1.08.415c-.277 0-.507-.071-.69-.213-.183-.143-.389-.373-.616-.69-.407-.619-.833-1.082-1.276-1.392-.444-.309-1.007-.464-1.69-.464-.985 0-1.779.385-2.381 1.154-.602.769-.903 1.82-.903 3.156 0 .626.077 1.202.232 1.727.154.525.378.972.67 1.343.294.37.648.65 1.063.842.415.191.87.287 1.367.287.667 0 1.24-.155 1.715-.464.476-.31.897-.781 1.264-1.416.203-.374.423-.667.659-.88.236-.21.525-.316.867-.316.406 0 .744.154 1.013.463.268.31.403.64.403.99zm11.56 2.246v-.427a7.436 7.436 0 0 1-1.258 1.27c-.44.341-.92.596-1.44.763-.521.166-1.115.25-1.782.25-.806 0-1.528-.167-2.167-.5a3.655 3.655 0 0 1-1.483-1.38c-.415-.708-.623-1.725-.623-3.052V7.245c0-.667.15-1.166.452-1.495.3-.33.7-.495 1.196-.495.505 0 .912.167 1.22.5.31.335.465.83.465 1.49v5.335c0 .773.065 1.422.195 1.947.13.525.364.935.702 1.233.338.297.795.445 1.373.445.562 0 1.09-.167 1.587-.5a2.922 2.922 0 0 0 1.087-1.307c.187-.472.28-1.505.28-3.1V7.245c0-.66.155-1.155.464-1.49.31-.333.712-.5 1.209-.5.496 0 .895.165 1.196.495.301.33.452.828.452 1.495v9.656c0 .635-.145 1.11-.434 1.428-.289.317-.661.476-1.117.476-.455 0-.832-.165-1.129-.494-.297-.33-.445-.792-.445-1.386zm9.521-14.721v5.09c.627-.651 1.266-1.15 1.917-1.495.65-.346 1.456-.52 2.417-.52 1.106 0 2.077.263 2.911.788.834.525 1.481 1.286 1.94 2.283.46.997.69 2.179.69 3.546 0 1.01-.128 1.935-.384 2.777-.256.842-.629 1.573-1.117 2.191a5.046 5.046 0 0 1-1.776 1.435 5.199 5.199 0 0 1-2.301.506c-.513 0-.995-.06-1.447-.183a4.242 4.242 0 0 1-1.153-.482 5.222 5.222 0 0 1-.812-.617 13.883 13.883 0 0 1-.885-.952v.33c0 .627-.15 1.1-.452 1.422-.3.321-.683.482-1.147.482-.472 0-.848-.16-1.13-.482-.28-.321-.42-.795-.42-1.422V2.35c0-.676.136-1.187.409-1.533C70.59.472 70.972.3 71.46.3c.513 0 .907.165 1.184.495.277.33.415.8.415 1.41zm.159 9.9c0 1.326.303 2.345.91 3.057.605.712 1.401 1.068 2.386 1.068.838 0 1.56-.364 2.166-1.092.607-.728.91-1.772.91-3.131 0-.88-.126-1.636-.379-2.27-.252-.635-.61-1.126-1.074-1.472-.464-.345-1.005-.518-1.623-.518-.635 0-1.2.173-1.697.518-.497.346-.887.847-1.172 1.502-.285.655-.427 1.434-.427 2.338zM97.46 3.595h-3.955v13c0 .75-.167 1.305-.5 1.667-.334.362-.766.543-1.295.543-.537 0-.974-.183-1.312-.55-.338-.365-.506-.919-.506-1.66v-13h-3.956c-.618 0-1.078-.136-1.379-.409-.301-.272-.452-.632-.452-1.08 0-.464.157-.83.47-1.099.314-.268.767-.403 1.362-.403H97.46c.627 0 1.092.139 1.398.416.305.276.457.638.457 1.086 0 .448-.154.808-.463 1.08-.31.273-.774.41-1.392.41zm16.247 8.435c0 .993-.154 1.909-.463 2.747a6.065 6.065 0 0 1-1.343 2.16 5.929 5.929 0 0 1-2.1 1.386c-.814.321-1.73.482-2.746.482-1.01 0-1.917-.163-2.723-.488a6.045 6.045 0 0 1-2.093-1.398 6.043 6.043 0 0 1-1.343-2.148c-.305-.826-.458-1.74-.458-2.74 0-1.01.155-1.934.464-2.772a6.03 6.03 0 0 1 1.33-2.148 5.865 5.865 0 0 1 2.1-1.373c.822-.322 1.73-.483 2.723-.483 1.009 0 1.924.163 2.746.489.822.325 1.526.789 2.112 1.391a6.015 6.015 0 0 1 1.337 2.149c.305.83.457 1.745.457 2.746zm-3.344 0c0-1.359-.3-2.417-.897-3.174-.599-.756-1.402-1.135-2.411-1.135-.651 0-1.225.17-1.722.507-.496.338-.878.836-1.147 1.495-.269.66-.403 1.428-.403 2.307 0 .871.132 1.632.397 2.283.264.651.643 1.15 1.135 1.495.493.346 1.072.52 1.74.52 1.009 0 1.812-.381 2.41-1.142.599-.761.898-1.813.898-3.156zm18.445 0c0 .993-.155 1.909-.464 2.747a6.065 6.065 0 0 1-1.343 2.16 5.929 5.929 0 0 1-2.1 1.386c-.813.321-1.729.482-2.746.482-1.01 0-1.917-.163-2.722-.488a6.045 6.045 0 0 1-2.094-1.398 6.043 6.043 0 0 1-1.343-2.148c-.305-.826-.457-1.74-.457-2.74 0-1.01.154-1.934.463-2.772a6.03 6.03 0 0 1 1.331-2.148 5.865 5.865 0 0 1 2.1-1.373c.822-.322 1.729-.483 2.722-.483 1.009 0 1.924.163 2.746.489.822.325 1.526.789 2.112 1.391a6.015 6.015 0 0 1 1.337 2.149c.305.83.458 1.745.458 2.746zm-3.345 0c0-1.359-.3-2.417-.897-3.174-.598-.756-1.402-1.135-2.411-1.135-.651 0-1.225.17-1.721.507-.497.338-.88.836-1.148 1.495-.268.66-.403 1.428-.403 2.307 0 .871.133 1.632.397 2.283s.643 1.15 1.135 1.495c.493.346 1.072.52 1.74.52 1.009 0 1.813-.381 2.41-1.142.599-.761.898-1.813.898-3.156zm5.97 4.749V2.326c0-.668.148-1.172.445-1.514.297-.342.697-.513 1.202-.513s.912.17 1.22.507c.31.338.465.844.465 1.52v14.453c0 .675-.157 1.182-.47 1.52-.314.337-.719.506-1.215.506-.488 0-.885-.175-1.19-.525-.305-.35-.458-.85-.458-1.501zm17.504-2.332c0 .92-.224 1.707-.671 2.362-.448.655-1.11 1.152-1.984 1.49-.875.337-1.939.506-3.192.506-1.196 0-2.222-.183-3.076-.55-.855-.365-1.486-.823-1.892-1.372-.407-.55-.61-1.101-.61-1.654 0-.367.13-.68.39-.94.26-.26.59-.391.989-.391.35 0 .618.085.805.256.187.171.366.411.537.72.342.595.751 1.038 1.227 1.331.476.293 1.125.44 1.947.44.668 0 1.215-.149 1.642-.446.427-.297.64-.637.64-1.02 0-.585-.22-1.012-.664-1.281-.444-.269-1.174-.525-2.192-.77-1.147-.284-2.08-.583-2.801-.896-.72-.314-1.296-.727-1.727-1.24-.432-.512-.647-1.143-.647-1.891 0-.668.2-1.298.598-1.893.399-.594.987-1.068 1.764-1.422.777-.354 1.715-.53 2.813-.53.863 0 1.638.089 2.326.268.688.179 1.261.419 1.721.72.46.301.81.635 1.05 1.001.24.366.36.724.36 1.074 0 .383-.128.696-.385.94-.256.244-.62.366-1.092.366-.342 0-.633-.097-.873-.292-.24-.196-.515-.489-.824-.88a3.012 3.012 0 0 0-.89-.78c-.343-.196-.807-.294-1.393-.294-.602 0-1.102.129-1.501.385-.399.256-.598.576-.598.958 0 .35.146.637.44.86.292.225.687.41 1.183.556.497.147 1.18.326 2.051.537 1.034.253 1.878.554 2.533.904s1.152.763 1.49 1.239c.337.476.506 1.019.506 1.63z"
    />
  </svg>
);

export default function EApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  useEffect(() => {
    reactGa && reactGa.pageview(router.pathname);

    const startProgress = () => NProgress.start();
    let timer;
    const stopProgress = () => {
      // reactGa && reactGa.pageview(pathname);
      clearTimeout(timer);
      NProgress.done();
    };

    const showProgressBar = () => {
      timer = setTimeout(startProgress, 300);
      Router.events.on("routeChangeComplete", stopProgress);
      Router.events.on("routeChangeError", stopProgress);
    };

    router.events.on("routeChangeStart", showProgressBar);

    return () => {
      Router.events.off("routeChangeComplete", stopProgress);
      Router.events.off("routeChangeError", stopProgress);
      Router.events.off("routeChangeStart", showProgressBar);
      timer && clearTimeout(timer);
    };
  }, []);
  const activeRoute = activeRouteData(router.pathname);
  const title =
    ((activeRoute && (activeRoute.title || activeRoute.searchTerm)) ||
      props.title) + " - W3cubTools";
  const description = activeRoute && activeRoute.desc;
  const keywords = activeRoute && activeRoute.keywords;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link href="/favicon.ico" rel="icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/site.webmanifest" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}

        {activeRoute && activeRoute.links && (
          <Links links={activeRoute.links} />
        )}

        {activeRoute && activeRoute.scripts && (
          <Scripts scripts={activeRoute.scripts} />
        )}
        <meta name="viewport" content="width=1024" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="author" content="W3cubTools" />
        <meta name="renderer" content="webkit" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={"https://tools.w3cub.com" + router.pathname}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://tools.w3cub.com/static/logo.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://tools.w3cub.com" + router.pathname}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://tools.w3cub.com/static/logo.png"
        />
      </Head>
      <Pane
        display="flex"
        alignItems="center"
        flexDirection="row"
        is="header"
        height={48}
        backgroundColor="#fff"
        paddingRight={"3%"}
        paddingLeft={"4%"}
        className="hidden-print"
        css={{
          boxShadow: "0 2px 2px 0 rgba(0,0,0,.1), 0 1px 0 0 rgba(0,0,0,.1)"
        }}
      >
        <Pane
          flex={1}
          display="flex"
          paddingRight={"3%"}
          className="logo-transform"
        >
          <a href="/">{logo}</a>
        </Pane>
        <Pane>
          <a href="https://docs.w3cub.com/" target="_blank">
            <Button appearance="minimal" height={40}>
              W3cubDocs
            </Button>
          </a>
        </Pane>
      </Pane>
      <ShareWidget></ShareWidget>
      <Pane className="mainlayout">
        <Component {...pageProps} />
      </Pane>
      {router.pathname != "/" && (
        <div className="sitemap hidden-print">
          {categorizedRoutes.map((route: any, i) => {
            return (
              <Fragment key={i + 1}>
                <ul className="clearfix ">
                  <li>
                    <span>{route.category}:</span>
                  </li>
                  {route.content.map((a: any) => {
                    return (
                      <li key={a.path}>
                        <a
                          href={a.path}
                          className="item"
                          key={route.category + a.label}
                        >
                          {a.label}{" "}
                          {a.beta && <span className="beta">Beta</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Fragment>
            );
          })}
        </div>
      )}
      <footer className="footer hidden-print">
        <div className="footer-logo">
          <svg width="149" height="19">
            <use xlinkHref="#icon-logo" />
          </svg>
        </div>
        <div className="wrap">
          <div className="nav">
            <a href="/privacy-policy">Privacy Policy</a>
            <a
              href="https://github.com/w3cub/w3cubtools-md/issues"
              target="_blank"
              className="mr-5"
            >
              Issues
            </a>
            <a
              href="https://github.com/w3cub/w3cubtools-md"
              className=""
              target="_blank"
            >
              Improve descriptions
            </a>
            <a href="/about#donate" className="">
              Donate
            </a>
            <a href="/about" className="">
              About
            </a>
          </div>
        </div>
        <div className="copy">
          Copyright © {new Date().getFullYear()} W3cub All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
EApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  let exts = {} as any;
  if (Component.title) {
    exts.title = Component.title;
  }
  if (Component.description) {
    exts.description = Component.description;
  }

  return { pageProps, ...exts };
};

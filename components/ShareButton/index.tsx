// import QRCode from 'qrcode.react'
import "./style.less";
import { useEffect, useState } from "react";
function getMetaContentByName(name) {
  return ((document.getElementsByName(name)[0] || 0) as any).content;
}

export default function(props) {
  const [initProps, setDocumentProps] = useState({
    image: "",
    site: "",
    title: "",
    description: "",
    url: "",
    origin: "",
    ...props
  });

  let sites = initProps.sites;
  // let url = initProps.url;
  const onClick = (e, name) => {
    let url = initProps.url;
    let title = encodeURIComponent(initProps.title);
    let description = encodeURIComponent(initProps.description);
    let image = encodeURIComponent(initProps.image);
    let site = encodeURIComponent(initProps.site);
    let origin = encodeURIComponent(initProps.origin);
    let summary = description;
    let source = site;

    const templates = {
      gmail: `https://mail.google.com/mail/u/0/?ui=2&view=cm&fs=1&tf=1&su=${title}&body=${url}%0D%0A%0D%0A${description}`,
      digg: `http://digg.com/submit?phase=2&url=${url}&title=${title}&bodytext=${description}`,
      line: `https://social-plugins.line.me/lineit/share?url=${url}`,
      reddit: `https://www.reddit.com/submit?url=${url}&title=${title}`,
      qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`,
      qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
      weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
      // wechat: `javascript:`,
      douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
      linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&href=${url}&quote=${title}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}%20${url}&url=${url}&via=${origin}`
    };
    if (templates[name]) {
      e.currentTarget.href = templates[name];
    }
  };

  // const wechatQrcodeTitle = '微信扫一扫：分享';
  // const wechatQrcodeHelper = '微信里点“发现”，扫一下,二维码便可将本文分享至朋友圈。';

  useEffect(() => {
    setDocumentProps({
      ...initProps,
      image: ((document.images[0] || 0) as any).src || "",
      site:
        getMetaContentByName("site") ||
        getMetaContentByName("Site") ||
        document.title,
      title:
        getMetaContentByName("title") ||
        getMetaContentByName("Title") ||
        document.title,
      description:
        getMetaContentByName("description") ||
        getMetaContentByName("Description") ||
        "",
      url: location.href,
      origin: location.origin
    });
  }, []);

  let html = sites.map(function(site, i) {
    let className = `icon-${site} social-share-icon`;
    return (
      <a
        key={i}
        className={className}
        href="javascript:;"
        onClick={e => {
          onClick(e, site);
        }}
        target="_blank"
      ></a>
    );
  });
  return (
    <div className={(props.className || "") + " social-share"}>{html}</div>
  );
}

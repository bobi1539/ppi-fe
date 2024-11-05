"use client";

import Footer from "../layouts/footer";
import Navbar from "../layouts/navbar";
import Staff from "./staff";
import ImageCabinet from "./image-cabinet";
import LatestEvent from "./latest-event";
import NewsLetter from "./news-letter";
import SocialMedia from "./social-media";
import WebCount from "./web-count";
import Support from "./support";
import { useEffect, useState } from "react";
import { SettingResponse } from "@/app/dto/response/setting-response";
import { webSettingFindById } from "@/app/backend-api/setting";
import { DEFAULT_IMAGE_URL, DIRECTORY_SETTING, SETTING_ID } from "@/app/constants/constant";
import { fileDownload } from "@/app/backend-api/file";

export default function HomePage() {
  const [setting, setSetting] = useState<SettingResponse>();
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const [urlBanner, setUrlBanner] = useState<string>(DEFAULT_IMAGE_URL);
  const [urlQrCode, setUrlQrCode] = useState<string>(DEFAULT_IMAGE_URL);

  useEffect(() => {
    fetchSetting();
  }, []);

  const fetchSetting = async (): Promise<void> => {
    const response = await webSettingFindById(SETTING_ID);
    setSetting(response);
    setLogoUrl(fileDownload(DIRECTORY_SETTING, response.logo));
    setUrlBanner(fileDownload(DIRECTORY_SETTING, response.banner));
    setUrlQrCode(fileDownload(DIRECTORY_SETTING, response.qrCode));
  };

  return (
    <div>
      <Navbar logoUrl={logoUrl} />
      <main>
        <ImageCabinet urlBanner={urlBanner} />
        <LatestEvent />
        <NewsLetter />
        <Staff periodIdActive={setting?.periodActive.id ?? 0} />
        <SocialMedia instagram={setting?.instagram ?? ""} tiktok={setting?.tiktok ?? ""} linkedin={setting?.linkedin ?? ""} youtube={setting?.youtube ?? ""} urlQrCode={urlQrCode} />
        <Support eventIdActive={setting?.eventGallery.id ?? 0} supportAccountName={setting?.supportAccountName ?? ""} supportAccountNumber={setting?.supportAccountNumber ?? ""} supportShortCode={setting?.supportShortCode ?? ""} />
        <WebCount periodActiveId={setting?.periodActive.id ?? 0} />
      </main>
      <Footer logoUrl={logoUrl} contactEmail={setting?.contactEmail ?? ""} contactPhoneNumber={setting?.contactPhoneNumber ?? ""} />
    </div>
  );
}

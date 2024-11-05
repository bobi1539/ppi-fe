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
import { SETTING_ID } from "@/app/constants/constant";

export default function HomePage() {
  const [setting, setSetting] = useState<SettingResponse>();

  useEffect(() => {
    fetchSetting();
  }, []);

  const fetchSetting = async (): Promise<void> => {
    const response = await webSettingFindById(SETTING_ID);
    setSetting(response);
  };

  return (
    <div>
      <Navbar urlLogo={setting?.logo ?? ""} />
      <main>
        <ImageCabinet urlBanner={setting?.banner ?? ""} />
        <LatestEvent />
        <NewsLetter />
        <Staff periodIdActive={setting?.periodActive.id ?? 0} />
        <SocialMedia instagram={setting?.instagram ?? ""} tiktok={setting?.tiktok ?? ""} linkedin={setting?.linkedin ?? ""} youtube={setting?.youtube ?? ""} urlQrCode={setting?.qrCode ?? ""} />
        <Support eventIdActive={setting?.eventGallery.id ?? 0} supportAccountName={setting?.supportAccountName ?? ""} supportAccountNumber={setting?.supportAccountNumber ?? ""} supportShortCode={setting?.supportShortCode ?? ""} />
        <WebCount />
      </main>
      <Footer urlLogo={setting?.logo??""} contactEmail={setting?.contactEmail ?? ""} contactPhoneNumber={setting?.contactPhoneNumber ?? ""} />
    </div>
  );
}

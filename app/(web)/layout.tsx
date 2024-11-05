"use client";

import { useEffect, useState } from "react";
import Footer from "./layouts/footer";
import Navbar from "./layouts/navbar";
import { SettingResponse } from "../dto/response/setting-response";
import { webSettingFindById } from "../backend-api/setting";
import { DEFAULT_IMAGE_URL, DIRECTORY_SETTING, SETTING_ID } from "../constants/constant";
import { fileDownload } from "../backend-api/file";

interface MainMenuLayoutProps {
  children: React.ReactNode;
}

export default function MainMenuLayout(props: Readonly<MainMenuLayoutProps>) {
  const [setting, setSetting] = useState<SettingResponse>();
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_IMAGE_URL);

  useEffect(() => {
    fetchSetting();
  }, []);

  const fetchSetting = async (): Promise<void> => {
    const response = await webSettingFindById(SETTING_ID);
    setSetting(response);
    setLogoUrl(fileDownload(DIRECTORY_SETTING, response.logo));
  };

  return (
    <div>
      <Navbar logoUrl={logoUrl} />
      <main>{props.children}</main>
      <Footer logoUrl={logoUrl} contactEmail={setting?.contactEmail ?? ""} contactPhoneNumber={setting?.contactPhoneNumber ?? ""} />
    </div>
  );
}
